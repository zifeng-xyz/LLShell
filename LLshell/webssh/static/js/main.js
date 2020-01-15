/*jslint browser:true */

var jQuery;
var wssh = {};

var sidenav = {
  // Sidenav is not visible by default.
  // Change to 1 if necessary
  sidenav_visible: 0,
};

$ ('.navbar-toggler').on ('click', function () {
  if (sidenav.sidenav_visible == 1) {
    $ ('html').removeClass ('nav-open');
    sidenav.sidenav_visible = 0;
    $ ('#overlay').remove ();
    setTimeout (function () {
      $ ('.navbar-toggler').removeClass ('toggled');
    }, 300);
  } else {
    setTimeout (function () {
      $ ('.navbar-toggler').addClass ('toggled');
    }, 300);

    // Add the overlay and make it close the sidenav on click
    var div = '<div id="overlay"></div>';
    $ (div).appendTo ('body').on ('click', function () {
      $ ('html').removeClass ('nav-open');
      sidenav.sidenav_visible = 0;
      $ ('#overlay').remove ();
      setTimeout (function () {
        $ ('.navbar-toggler').removeClass ('toggled');
      }, 300);
    });

    $ ('html').addClass ('nav-open');
    sidenav.sidenav_visible = 1;
  }
});

(function () {
  // For FormData without getter and setter
  var proto = FormData.prototype, data = {};

  if (!proto.get) {
    proto.get = function (name) {
      if (data[name] === undefined) {
        var input = document.querySelector ('input[name="' + name + '"]'),
          value;
        if (input) {
          if (input.type === 'file') {
            value = input.files[0];
          } else {
            value = input.value;
          }
          data[name] = value;
        }
      }
      return data[name];
    };
  }

  if (!proto.set) {
    proto.set = function (name, value) {
      data[name] = value;
    };
  }
}) ();

jQuery (function ($) {
  var status = $ ('#status'),
    button = $ ('.btn-primary'),
    form_container = $ ('.form-container'),
    waiter = $ ('#waiter'),
    term_type = $ ('#term'),
    style = {},
    default_title = 'WebSSH',
    title_element = document.querySelector ('title'),
    form_id = '#connect',
    debug = document.querySelector (form_id).noValidate,
    custom_font = document.fonts
      ? document.fonts.values ().next ().value
      : undefined,
    default_fonts,
    DISCONNECTED = 0,
    CONNECTING = 1,
    CONNECTED = 2,
    state = DISCONNECTED,
    messages = {
      1: 'This client is connecting ...',
      2: 'This client is already connnected.',
    },
    key_max_size = 16384,
    fields = ['hostname', 'port', 'username'],
    form_keys = fields.concat (['password', 'totp']),
    opts_keys = ['bgcolor', 'title', 'encoding', 'command', 'term'],
    url_form_data = {},
    url_opts_data = {},
    validated_form_data,
    event_origin,
    hostname_tester = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;

  function store_items (names, data) {
    var i, name, value;

    for (i = 0; i < names.length; i++) {
      name = names[i];
      value = data.get (name);
      if (value) {
        window.localStorage.setItem (name, value);
      }
    }
  }

  function restore_items (names) {
    var i, name, value;

    for (i = 0; i < names.length; i++) {
      name = names[i];
      value = window.localStorage.getItem (name);
      if (value) {
        $ ('#' + name).val (value);
      }
    }
  }

  function populate_form (data) {
    var names = form_keys.concat (['passphrase']), i, name;

    for (i = 0; i < names.length; i++) {
      name = names[i];
      $ ('#' + name).val (data.get (name));
    }
  }

  function get_object_length (object) {
    return Object.keys (object).length;
  }

  function decode_uri (uri) {
    try {
      return decodeURI (uri);
    } catch (e) {
      console.error (e);
    }
    return '';
  }

  function decode_password (encoded) {
    try {
      return window.atob (encoded);
    } catch (e) {
      console.error (e);
    }
    return null;
  }

  function parse_url_data (string, form_keys, opts_keys, form_map, opts_map) {
    var i, pair, key, val, arr = string.split ('&');

    for (i = 0; i < arr.length; i++) {
      pair = arr[i].split ('=');
      key = pair[0].trim ().toLowerCase ();
      val = pair[1] && pair[1].trim ();

      if (form_keys.indexOf (key) >= 0) {
        form_map[key] = val;
      } else if (opts_keys.indexOf (key) >= 0) {
        opts_map[key] = val;
      }
    }

    if (form_map.password) {
      form_map.password = decode_password (form_map.password);
    }
  }

  function parse_xterm_style () {
    var text = $ ('.xterm-helpers style').text ();
    var arr = text.split ('xterm-normal-char{width:');
    style.width = parseFloat (arr[1]);
    arr = text.split ('div{height:');
    style.height = parseFloat (arr[1]);
  }

  function get_cell_size (term) {
    style.width = term._core.renderer.dimensions.actualCellWidth;
    style.height = term._core.renderer.dimensions.actualCellHeight;
  }

  function toggle_fullscreen (term) {
    var func = term.toggleFullScreen || term.toggleFullscreen;
    func.call (term, true);
  }

  function current_geometry (term) {
    if (!style.width || !style.height) {
      try {
        get_cell_size (term);
      } catch (TypeError) {
        parse_xterm_style ();
      }
    }

    console.log (window.innerWidth);
    console.log (window.innerHeight);

    var cols = parseInt (window.innerWidth / style.width, 10) - 3;
    var rows = parseInt (window.innerHeight / style.height, 10) - 2;
    return {cols: cols, rows: rows};
  }

  function resize_terminal (term) {
    var geometry = current_geometry (term);
    console.log (geometry);
    term.on_resize (geometry.cols, geometry.rows);
  }

  function set_backgound_color (term, color) {
    term.setOption ('theme', {
      background: color,
    });
  }

  function custom_font_is_loaded () {
    if (!custom_font) {
      console.log ('No custom font specified.');
    } else {
      console.log (
        'Status of custom font ' +
          custom_font.family +
          ': ' +
          custom_font.status
      );
      if (custom_font.status === 'loaded') {
        return true;
      }
      if (custom_font.status === 'unloaded') {
        return false;
      }
    }
  }

  function update_font_family (term) {
    if (term.font_family_updated) {
      console.log ('Already using custom font family');
      return;
    }

    if (!default_fonts) {
      default_fonts = term.getOption ('fontFamily');
    }

    console.log ('update_font_family default_fonts begin');
    console.log (default_fonts);
    console.log ('update_font_family default_fonts end');

    if (custom_font_is_loaded ()) {
      var new_fonts = custom_font.family + ', ' + default_fonts;
      console.log ('update_font_family new_fonts begin');
      console.log (default_fonts);
      console.log ('update_font_family new_fonts end');
      term.setOption ('fontFamily', new_fonts);
      term.font_family_updated = true;
      console.log ('Using custom font family ' + new_fonts);
    }
  }

  function reset_font_family (term) {
    if (!term.font_family_updated) {
      console.log ('Already using default font family');
      return;
    }

    console.log ('reset_font_family default_fonts begin');
    console.log (default_fonts);
    console.log ('reset_font_family default_fonts end');

    if (default_fonts) {
      term.setOption ('fontFamily', default_fonts);
      term.font_family_updated = false;
      console.log ('Using default font family ' + default_fonts);
    }
  }

  function format_geometry (cols, rows) {
    return JSON.stringify ({cols: cols, rows: rows});
  }

  function read_as_text_with_decoder (file, callback, decoder) {
    var reader = new window.FileReader ();

    if (decoder === undefined) {
      decoder = new window.TextDecoder ('utf-8', {fatal: true});
    }

    reader.onload = function () {
      var text;
      try {
        text = decoder.decode (reader.result);
      } catch (TypeError) {
        console.log ('Decoding error happened.');
      } finally {
        if (callback) {
          callback (text);
        }
      }
    };

    reader.onerror = function (e) {
      console.error (e);
    };

    reader.readAsArrayBuffer (file);
  }

  function read_as_text_with_encoding (file, callback, encoding) {
    var reader = new window.FileReader ();

    if (encoding === undefined) {
      encoding = 'utf-8';
    }

    reader.onload = function () {
      if (callback) {
        callback (reader.result);
      }
    };

    reader.onerror = function (e) {
      console.error (e);
    };

    reader.readAsText (file, encoding);
  }

  function read_file_as_text (file, callback, decoder) {
    if (!window.TextDecoder) {
      read_as_text_with_encoding (file, callback, decoder);
    } else {
      read_as_text_with_decoder (file, callback, decoder);
    }
  }

  function reset_wssh () {
    var name;

    for (name in wssh) {
      if (wssh.hasOwnProperty (name) && name !== 'connect') {
        delete wssh[name];
      }
    }
  }

  function log_status (text, to_populate) {
    console.log (text);
    status.html (text.split ('\n').join ('<br/>'));

    if (to_populate && validated_form_data) {
      populate_form (validated_form_data);
      validated_form_data = undefined;
    }

    if (waiter.css ('display') !== 'none') {
      waiter.hide ();
    }

    if (form_container.css ('display') === 'none') {
      form_container.show ();
    }
  }

  function ajax_complete_callback (resp) {
    button.prop ('disabled', false);

    if (resp.status !== 200) {
      log_status (resp.status + ': ' + resp.statusText, true);
      state = DISCONNECTED;
      return;
    }

    var msg = resp.responseJSON;
    if (!msg.id) {
      log_status (msg.status, true);
      state = DISCONNECTED;
      return;
    }

    var ws_url = window.location.href
      .split (/\?|#/, 1)[0]
      .replace ('http', 'ws'),
      join = ws_url[ws_url.length - 1] === '/' ? '' : '/',
      url = ws_url + join + 'ws?id=' + msg.id,
      sock = new window.WebSocket (url),
      encoding = 'utf-8',
      decoder = window.TextDecoder
        ? new window.TextDecoder (encoding)
        : encoding,
      terminal = document.getElementById ('terminal'),
      term = new window.Terminal ({
        cursorBlink: true, //光标闪烁
        scrollback: 1000, //终端中的回滚量
        theme: {
          background: url_opts_data.bgcolor || 'black',
        },
      });

    term.setOption ('fontSize', $ ('#fontsize').val ());
    // term.setOption('fontFamily', "Helvetica, Tahoma, Arial");

    console.log (url);
    if (!msg.encoding) {
      console.log ('Unable to detect the default encoding of your server');
      msg.encoding = encoding;
    } else {
      console.log ('The deault encoding of your server is ' + msg.encoding);
    }

    function term_write (text) {
      if (term) {
        term.write (text);
        if (!term.resized) {
          resize_terminal (term);
          term.resized = true;
        }
      }
    }

    function set_encoding (new_encoding) {
      // for console use
      if (!new_encoding) {
        console.log ('An encoding is required');
        return;
      }

      if (!window.TextDecoder) {
        decoder = new_encoding;
        encoding = decoder;
        console.log ('Set encoding to ' + encoding);
      } else {
        try {
          decoder = new window.TextDecoder (new_encoding);
          encoding = decoder.encoding;
          console.log ('Set encoding to ' + encoding);
        } catch (RangeError) {
          console.log ('Unknown encoding ' + new_encoding);
          return false;
        }
      }
    }

    wssh.set_encoding = set_encoding;

    if (url_opts_data.encoding) {
      if (set_encoding (url_opts_data.encoding) === false) {
        set_encoding (msg.encoding);
      }
    } else {
      set_encoding (msg.encoding);
    }

    wssh.geometry = function () {
      // for console use
      var geometry = current_geometry (term);
      console.log ('Current window geometry: ' + JSON.stringify (geometry));
    };

    wssh.send = function (data) {
      // for console use
      if (!sock) {
        console.log ('Websocket was already closed');
        return;
      }

      if (typeof data !== 'string') {
        console.log ('Only string is allowed');
        return;
      }

      try {
        JSON.parse (data);
        sock.send (data);
      } catch (SyntaxError) {
        data = data.trim () + '\r';
        sock.send (JSON.stringify ({data: data}));
      }
    };

    wssh.reset_encoding = function () {
      // for console use
      if (encoding === msg.encoding) {
        console.log ('Already reset to ' + msg.encoding);
      } else {
        set_encoding (msg.encoding);
      }
    };

    wssh.resize = function (cols, rows) {
      // for console use
      if (term === undefined) {
        console.log ('Terminal was already destroryed');
        return;
      }

      var valid_args = false;

      if (cols > 0 && rows > 0) {
        var geometry = current_geometry (term);
        if (cols <= geometry.cols && rows <= geometry.rows) {
          valid_args = true;
        }
      }

      if (!valid_args) {
        console.log (
          'Unable to resize terminal to geometry: ' +
            format_geometry (cols, rows)
        );
      } else {
        term.on_resize (cols, rows);
      }
    };

    wssh.set_bgcolor = function (color) {
      set_backgound_color (term, color);
    };

    wssh.custom_font = function () {
      update_font_family (term);
    };

    wssh.default_font = function () {
      reset_font_family (term);
    };

    term.on_resize = function (cols, rows) {
      if (cols !== this.cols || rows !== this.rows) {
        console.log (
          'Resizing terminal to geometry: ' + format_geometry (cols, rows)
        );
        this.resize (cols, rows);
        sock.send (JSON.stringify ({resize: [cols, rows]}));
      }
    };

    term.on ('data', function (data) {
      // console.log(data);
      sock.send (JSON.stringify ({data: data}));
    });

    //选中 复制
    term.on ('selection', function () {
      console.log ('on selection');
      if (term.hasSelection ()) {
        this.copy = term.getSelection ();
        console.log ('on this.copy', this.copy);
        // $("#clipboard").val(this.copy)

        // // 到剪切板
        // const input = document.createElement('input');
        // input.setAttribute('readonly', 'readonly');
        // // input.setAttribute('type', 'hidden');
        // input.setAttribute('value', this.copy);
        // document.body.appendChild(input);
        // input.setSelectionRange(0, 9999);
        // if (document.execCommand('copy')) {
        //   document.execCommand('copy');
        //   console.log('复制成功');
        // }
        // document.body.removeChild(input);

        // IE
        window.clipboardData.setData ('Text', this.copy);
        // $("#clipboard_copy").trigger("click");
      }
    });
    //右键菜单
    $ ('#waiter').on ('paste', function (event) {
      // console.log("2222")
      event.preventDefault ();
      // IE
      sock.send (
        JSON.stringify ({data: window.clipboardData.getData ('Text')})
      );
    });
    $ ('body').contextmenu (function (event) {
      event.preventDefault ();
      console.log ('1111');
      $ ('#waiter').trigger ('paste');
    });

    // 快捷键  Keyboard Shortcuts
    term.attachCustomKeyEventHandler (function (ev) {
      // 切换标签
      console.log (ev);
      if (ev.ctrlKey && ev.keyCode == 39) {
        data = {};
        data['ctrltab'] = 1;
        data['_xsrf'] = $ ("input[name^='_xsrf']").val ();
        $.ajax ({
          url: '/',
          type: 'PUT',
          data: data,
          success: function (result) {
            // Do something with the result
            console.log (result);
          },
        });
        // $.trigger("blur");
        return false;
      } else if (ev.ctrlKey && ev.keyCode == 37) {
        // var form = document.querySelector(form_id),
        //   data;
        // data = new FormData(form);
        // console.log(data)
        data = {};
        data['ctrltab'] = -1;
        data['_xsrf'] = $ ("input[name^='_xsrf']").val ();
        $.ajax ({
          url: '/',
          type: 'PUT',
          data: data,
          success: function (result) {
            // Do something with the result
            console.log (result);
          },
        });
        // $.trigger("blur");
        return false;
      } else if (ev.keyCode == 112 && ev.ctrlKey) {
        console.log ($ ('#Shortcuts_F1').val ().replace ('<br/>', '\n'));
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F1').val ().replace ('<br/>', '\n'),
          })
        );
        // console.log(data)
      } else if (ev.keyCode == 113 && ev.ctrlKey) {
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F2').val ().replace ('<br/>', '\n'),
          })
        );
      } else if (ev.keyCode == 114 && ev.ctrlKey) {
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F3').val ().replace ('<br/>', '\n'),
          })
        );
      } else if (ev.keyCode == 115 && ev.ctrlKey) {
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F4').val ().replace ('<br/>', '\n'),
          })
        );
      } else if (ev.keyCode == 116 && ev.ctrlKey) {
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F5').val ().replace ('<br/>', '\n'),
          })
        );
      } else if (ev.keyCode == 117 && ev.ctrlKey) {
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F8').val ().replace ('<br/>', '\n'),
          })
        );
      } else if (ev.keyCode == 118 && ev.ctrlKey) {
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F9').val ().replace ('<br/>', '\n'),
          })
        );
      } else if (ev.keyCode == 119 && ev.ctrlKey) {
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F10').val ().replace ('<br/>', '\n'),
          })
        );
      } else if (ev.keyCode == 120 && ev.ctrlKey) {
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F11').val ().replace ('<br/>', '\n'),
          })
        );
      } else if (ev.keyCode == 121 && ev.ctrlKey) {
        sock.send (
          JSON.stringify ({
            data: $ ('#Shortcuts_F12').val ().replace ('<br/>', '\n'),
          })
        );
      }
    });

    sock.onopen = function () {
      term.open (terminal);
      toggle_fullscreen (term);
      update_font_family (term);
      term.focus ();
      state = CONNECTED;
      title_element.text = url_opts_data.title || default_title;
      if (url_opts_data.command) {
        setTimeout (function () {
          sock.send (JSON.stringify ({data: url_opts_data.command + '\r'}));
        }, 500);
      }
    };

    sock.onmessage = function (msg) {
      read_file_as_text (msg.data, term_write, decoder);
    };

    sock.onerror = function (e) {
      console.error (e);
    };

    sock.onclose = function (e) {
      term.destroy ();
      term = undefined;
      sock = undefined;
      reset_wssh ();
      log_status (e.reason, true);
      state = DISCONNECTED;
      default_title = 'WebSSH';
      title_element.text = default_title;
    };

    $ (window).resize (function () {
      if (term) {
        resize_terminal (term);
      }
    });

    $ ('#fontsize').change (function () {
      term.setOption ('fontSize', $ ('#fontsize').val ());
      get_cell_size (term);
      resize_terminal (term);

      data = {};
      data['_xsrf'] = $ ("input[name^='_xsrf']").val ();
      data['fontsize'] = $ ('#fontsize').val ();
      data['host_id'] = $ ('#host_id').val ();
      $.ajax ({
        url: '/',
        type: 'PUT',
        data: data,
        success: function (result) {
          // Do something with the result
          console.log (result);
        },
      });
      return false;
    });
  }

  function wrap_object (opts) {
    var obj = {};

    obj.get = function (attr) {
      return opts[attr] || '';
    };

    obj.set = function (attr, val) {
      opts[attr] = val;
    };

    return obj;
  }

  function clean_data (data) {
    var i, attr, val;
    var attrs = form_keys.concat (['privatekey', 'passphrase']);

    for (i = 0; i < attrs.length; i++) {
      attr = attrs[i];
      val = data.get (attr);
      if (typeof val === 'string') {
        data.set (attr, val.trim ());
      }
    }
  }

  function validate_form_data (data) {
    clean_data (data);

    var hostname = data.get ('hostname'),
      port = data.get ('port'),
      username = data.get ('username'),
      pk = data.get ('privatekey'),
      result = {
        valid: false,
        data: data,
        title: '',
      },
      errors = [],
      size;

    if (!hostname) {
      errors.push ('Value of hostname is required.');
    } else {
      if (!hostname_tester.test (hostname)) {
        errors.push ('Invalid hostname: ' + hostname);
      }
    }

    if (!port) {
      port = 22;
    } else {
      if (!(port > 0 && port < 65535)) {
        errors.push ('Invalid port: ' + port);
      }
    }

    if (!username) {
      errors.push ('Value of username is required.');
    }

    if (pk) {
      size = pk.size || pk.length;
      if (size > key_max_size) {
        errors.push ('Invalid private key: ' + pk.name || '');
      }
    }

    if (!errors.length || debug) {
      result.valid = true;
      result.title = username + '@' + hostname + ':' + port;
    }
    result.errors = errors;

    return result;
  }

  // Fix empty input file ajax submission error for safari 11.x
  function disable_file_inputs (inputs) {
    var i, input;

    for (i = 0; i < inputs.length; i++) {
      input = inputs[i];
      if (input.files.length === 0) {
        input.setAttribute ('disabled', '');
      }
    }
  }

  function enable_file_inputs (inputs) {
    var i;

    for (i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute ('disabled');
    }
  }

  function connect_without_options () {
    // use data from the form
    var form = document.querySelector (form_id),
      inputs = form.querySelectorAll ('input[type="file"]'),
      url = form.action,
      data,
      pk;

    disable_file_inputs (inputs);
    data = new FormData (form);
    pk = data.get ('privatekey');
    enable_file_inputs (inputs);

    function ajax_post () {
      status.text ('');
      button.prop ('disabled', true);

      $.ajax ({
        url: url,
        type: 'post',
        data: data,
        complete: ajax_complete_callback,
        cache: false,
        contentType: false,
        processData: false,
      });
    }

    var result = validate_form_data (data);
    if (!result.valid) {
      log_status (result.errors.join ('\n'));
      return;
    }

    if (pk && pk.size && !debug) {
      read_file_as_text (pk, function (text) {
        if (text === undefined) {
          log_status ('Invalid private key: ' + pk.name);
        } else {
          ajax_post ();
        }
      });
    } else {
      ajax_post ();
    }

    return result;
  }

  function connect_with_options (data) {
    // use data from the arguments
    var form = document.querySelector (form_id),
      url = data.url || form.action,
      _xsrf = form.querySelector ('input[name="_xsrf"]');

    var result = validate_form_data (wrap_object (data));
    if (!result.valid) {
      log_status (result.errors.join ('\n'));
      return;
    }

    data.term = term_type.val ();
    data._xsrf = _xsrf.value;
    if (event_origin) {
      data._origin = event_origin;
    }

    status.text ('');
    button.prop ('disabled', true);

    $.ajax ({
      url: url,
      type: 'post',
      data: data,
      complete: ajax_complete_callback,
    });

    return result;
  }

  function connect (
    hostname,
    port,
    username,
    password,
    privatekey,
    passphrase,
    totp
  ) {
    // for console use
    var result, opts;

    if (state !== DISCONNECTED) {
      console.log (messages[state]);
      return;
    }

    if (hostname === undefined) {
      result = connect_without_options ();
    } else {
      if (typeof hostname === 'string') {
        opts = {
          hostname: hostname,
          port: port,
          username: username,
          password: password,
          privatekey: privatekey,
          passphrase: passphrase,
          totp: totp,
        };
      } else {
        opts = hostname;
      }

      result = connect_with_options (opts);
    }

    if (result) {
      state = CONNECTING;
      default_title = result.title;
      if (hostname) {
        validated_form_data = result.data;
      }
      store_items (fields, result.data);
    }
  }

  wssh.connect = connect;

  $ (form_id).submit (function (event) {
    event.preventDefault ();
    connect ();
  });

  function cross_origin_connect (event) {
    console.log (event.origin);
    var prop = 'connect', args;

    try {
      args = JSON.parse (event.data);
    } catch (SyntaxError) {
      args = event.data.split ('|');
    }

    if (!Array.isArray (args)) {
      args = [args];
    }

    try {
      event_origin = event.origin;
      wssh[prop].apply (wssh, args);
    } finally {
      event_origin = undefined;
    }
  }

  window.addEventListener ('message', cross_origin_connect, false);

  if (window.Terminal.applyAddon) {
    window.Terminal.applyAddon (window.fullscreen);
  }

  if (document.fonts) {
    document.fonts.ready.then (function () {
      if (custom_font_is_loaded () === false) {
        document.body.style.fontFamily = custom_font.family;
      }
    });
  }

  parse_url_data (
    decode_uri (window.location.search.substring (1)) +
      '&' +
      decode_uri (window.location.hash.substring (1)),
    form_keys,
    opts_keys,
    url_form_data,
    url_opts_data
  );
  // console.log(url_form_data);
  // console.log(url_opts_data);

  if (url_opts_data.term) {
    term_type.val (url_opts_data.term);
  }

  if (url_form_data.password === null) {
    log_status ('Password via url must be encoded in base64.');
  } else {
    if (get_object_length (url_form_data)) {
      waiter.show ();
      connect (url_form_data);
    } else {
      restore_items (fields);
      form_container.show ();
    }
  }
});
