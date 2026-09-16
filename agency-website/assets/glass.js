/* glass.js — fluted-glass shader, ported from the 21st.dev Shader Builder
   component ("Fluted Glass", adapted from Paper Shaders, Apache-2.0) to a
   framework-free module so a static page can own the canvas and write to the
   uniforms every frame.
*/
(function (global) {
  'use strict';

  var VERT = 'attribute vec2 a_position;\nvoid main(){gl_Position=vec4(a_position,0.0,1.0);}';

  var FRAG = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH', 'precision highp float;', '#else', 'precision mediump float;', '#endif',
    'uniform vec3 u_colors[8];',
    'uniform vec4 u_scene;', 'uniform vec4 u_shape;', 'uniform vec4 u_surface;', 'uniform vec4 u_finish;',
    'uniform vec4 u_transform;', 'uniform vec4 u_space;', 'uniform vec4 u_cursor;', 'uniform vec4 u_shade;',
    'uniform sampler2D u_faceTex;', 'uniform float u_useFace;',
    '#define u_resolution u_scene.xy', '#define u_time u_scene.z', '#define u_colorCount u_scene.w',
    '#define u_scale u_shape.x', '#define u_intensity u_shape.y', '#define u_paramA u_shape.z', '#define u_warp u_shape.w',
    '#define u_detail u_surface.x', '#define u_contrast u_surface.y', '#define u_brightness u_surface.z', '#define u_saturation u_surface.w',
    '#define u_hue u_finish.x', '#define u_vignette u_finish.y', '#define u_blur u_finish.z', '#define u_grain u_finish.w',
    '#ifdef GL_FRAGMENT_PRECISION_HIGH', '#define u_seed u_transform.x', '#else', '#define u_seed mod(u_transform.x, 31.0)', '#endif',
    '#define u_rotate u_transform.y', '#define u_drift u_transform.z', '#define u_oklab u_transform.w',
    '#define u_offset u_space.xy', '#define u_mouse u_space.zw',
    '#define u_cursorPresence u_cursor.x', '#define u_cursorEffect u_cursor.y', '#define u_cursorStrength u_cursor.z', '#define u_cursorRadius u_cursor.w',
    'float hash21(vec2 p){',
    '#ifndef GL_FRAGMENT_PRECISION_HIGH', '  p = mod(p, 31.0);', '#endif',
    '  p = fract(p * vec2(234.34, 435.345)); p += dot(p, p + 34.23); return fract(p.x * p.y);}',
    'float grainHash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z);}',
    'float noise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x), mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);}',
    'float fbm(vec2 p){ float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + vec2(17.0, 9.2); a *= 0.5; } return v;}',
    'vec3 srgbToLinear(vec3 c){ return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));}',
    'vec3 linearToSrgb(vec3 c){ return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));}',
    'vec3 linToOklab(vec3 c){',
    '  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;',
    '  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;',
    '  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;',
    '  l = pow(max(l, 0.0), 1.0 / 3.0); m = pow(max(m, 0.0), 1.0 / 3.0); s = pow(max(s, 0.0), 1.0 / 3.0);',
    '  return vec3(0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);}',
    'vec3 oklabToLin(vec3 c){',
    '  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z; float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z; float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;',
    '  l = l * l * l; m = m * m * m; s = s * s * s;',
    '  return vec3(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);}',
    'vec3 mixColour(vec3 a, vec3 b, float t){ if (u_oklab > 0.5){ vec3 la = linToOklab(srgbToLinear(a)); vec3 lb = linToOklab(srgbToLinear(b)); return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);} return mix(a, b, t);}',
    'vec3 palette(float x){ float n = max(u_colorCount - 1.0, 1.0); float f = clamp(x, 0.0, 1.0) * n; vec3 col = u_colors[0];',
    '  for (int i = 0; i < 7; i++){ if (float(i) < n) col = mixColour(col, u_colors[i + 1], smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0))); } return col;}',
    'vec3 hueRotate(vec3 col, float a){ const mat3 toYIQ = mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312);',
    '  const mat3 toRGB = mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703); vec3 yiq = toYIQ * col; float ca = cos(a), sa = sin(a);',
    '  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca); return toRGB * yiq;}',
    'vec3 shade(vec2 uv, vec2 p, float t){',
    '  float flutes = mix(42.0, 7.0, u_paramA);',
    '  float cell = fract((p.x + 1.0) * flutes) - 0.5;',
    '  float prism = sin(cell * 3.1415926) * (0.03 + u_intensity * 0.2);',
    '  vec2 samplePoint = p + vec2(prism, sin(p.x * flutes + t * 0.2) * prism * 0.35);',
    '  float field = fbm(samplePoint * 2.2 + vec2(t * 0.035, -t * 0.025) + u_seed);',
    '  field += 0.24 * sin(samplePoint.y * 3.0 + samplePoint.x * 1.3);',
    '  float highlight = pow(1.0 - abs(cell) * 2.0, mix(12.0, 2.0, u_intensity));',
    '  float shadow = smoothstep(0.18, 0.5, abs(cell));',
    '  vec3 glass = palette(clamp(field + highlight * 0.3, 0.0, 1.0));',
    '  return glass * (u_shade.x + highlight * u_shade.y - shadow * u_shade.z);}',
    'void main(){',
    '  vec2 uv = gl_FragCoord.xy / u_resolution.xy; vec2 screenUv = uv;',
    '  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);',
    '  float cursorMask = 0.0; float faceVal = 0.0;',
    '  if (u_cursorPresence > 0.001){',
    '    vec2 cursor = (0.5 * u_mouse * u_resolution.xy) / min(u_resolution.x, u_resolution.y);',
    '    vec2 cursorDelta = p - cursor;',
    '    if (u_cursorEffect < 0.5){ p += cursor * u_cursorPresence * u_cursorStrength * 0.55; }',
    '    else { float cursorDistance = length(cursorDelta); vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);',
    '      cursorMask = u_cursorPresence * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));',
      '      if (u_useFace > 0.5) { vec2 faceUV = (cursorDelta / max(u_cursorRadius * 0.25, 0.001)) * 0.5 + 0.5; if(faceUV.x > 0.0 && faceUV.x < 1.0 && faceUV.y > 0.0 && faceUV.y < 1.0) { faceUV.y = 1.0 - faceUV.y; vec4 fTex = texture2D(u_faceTex, faceUV); faceVal = ((fTex.a < 0.99) ? fTex.a : dot(fTex.rgb, vec3(0.299, 0.587, 0.114))) * cursorMask; } }',
      '      if (u_cursorEffect < 1.5){ p -= cursorDirection * cursorMask * u_cursorStrength * 0.24; }',
      '      else if (u_cursorEffect < 2.5){ float cursorAngle = cursorMask * u_cursorStrength * 2.2; float cc = cos(cursorAngle), cs = sin(cursorAngle); p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta; }',
      '      else if (u_cursorEffect < 3.5){ float ripple = sin(cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0); p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07; } } }',
    '  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;',
    '  p *= u_scale;',
    '  if (abs(u_rotate) > 0.0001){ float cr = cos(u_rotate), sr = sin(u_rotate); p = mat2(cr, -sr, sr, cr) * p; }',
    '  p += u_offset;',
    '  if (u_drift > 0.0001) p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));',
    '  if (u_warp > 0.0){ p += u_warp * (vec2(fbm(p * u_detail + u_seed), fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5); }',
    '  vec3 col;',
    '  if (u_blur > 0.0){ float e = u_blur; float pe = e * u_scale; vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;',
    '    col  = shade(uv, p, u_time) * 0.36; col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16; col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;',
    '    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16; col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16; }',
    '  else { col = shade(uv, p, u_time); }',
    '  if (faceVal > 0.001) { col = mix(col, col + vec3(0.08, 0.06, 0.12), faceVal * u_cursorStrength * 1.5); }',
    '  if (abs(u_contrast - 1.0) > 0.0001) col = (col - 0.5) * u_contrast + 0.5;',
    '  if (abs(u_saturation - 1.0) > 0.0001){ float luma = dot(col, vec3(0.299, 0.587, 0.114)); col = mix(vec3(luma), col, u_saturation); }',
    '  if (abs(u_hue) > 0.0001) col = hueRotate(col, u_hue);',
    '  if (abs(u_brightness) > 0.0001) col += u_brightness;',
    '  if (u_vignette > 0.0001){ float vd = length(screenUv - 0.5) * 1.41421356; col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd); }',
    '  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5) col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;',
    '  if (u_grain > 0.0001) col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;',
    '  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);}'
  ].join('\n');

  var DEFAULTS = {
    colors: [[0.027,0.102,0.141],[0.082,0.369,0.459],[0.404,0.910,0.976],[0.941,0.992,0.980]],
    colorCount: 4, scale: 1.26, intensity: 0.35, paramA: 0.28, warp: 0.0,
    detail: 1.824, contrast: 1.005, brightness: 0.0, saturation: 1.0,
    hue: 0.0, vignette: 0.0, blur: 0.0, grain: 0.042,
    seed: 1.0, rotate: 0.0, drift: 0.0, offsetX: 0.0, offsetY: 0.0,
    cursorEnabled: false, cursorEffect: 2.0, cursorStrength: 0.65, cursorRadius: 0.46,
    oklab: 0.0, timeScale: 0.575,
    shadeBase: 0.72, shadeHighlight: 0.42, shadeShadow: 0.12,
    maxPixels: 2000000, maxDpr: 2, faceImage: null
  };

  function hexToRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  function mount(canvas, opts) {
    var U = {};
    for (var k in DEFAULTS) U[k] = DEFAULTS[k];
    for (var o in (opts || {})) U[o] = opts[o];
    if (U.colors.length && typeof U.colors[0] === 'string') U.colors = U.colors.map(hexToRgb);
    U.colorCount = U.colors.length;
    while (U.colors.length < 8) U.colors.push(U.colors[U.colors.length - 1]);

    var gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) return null;

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn('[glass] shader', gl.getShaderInfoLog(s));
      return s;
    }
    var program = gl.createProgram();
    var vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    gl.deleteShader(vs); gl.deleteShader(fs);
    gl.useProgram(program);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uni = {};
    ['u_colors','u_scene','u_shape','u_surface','u_finish','u_transform','u_space','u_cursor','u_shade', 'u_useFace', 'u_faceTex'].forEach(function (n) {
      uni[n] = gl.getUniformLocation(program, n);
    });

    var flat = [];
    for (var i = 0; i < 8; i++) flat.push(U.colors[i][0], U.colors[i][1], U.colors[i][2]);
    gl.uniform3fv(uni.u_colors, new Float32Array(flat));

    var faceTex = gl.createTexture();
    var hasFace = false;
    if (U.faceImage) {
      var img = new Image();
      img.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, faceTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        hasFace = true;
        dirty = true; request();
      };
      img.src = U.faceImage;
    }

    var targetX = 0, targetY = 0, targetPresence = 0, mouseX = 0, mouseY = 0, cursorPresence = 0;
    var pointerKnown = false, pcx = 0, pcy = 0;
    var bounds = canvas.getBoundingClientRect();
    var raf = 0, lastNow = null, disposed = false;
    // Read live, never cached: a page that loads hidden (a background tab, a
    // prerender, an embedded pane) may never dispatch visibilitychange, and a
    // cached false would leave the canvas on its opaque-black first buffer.
    function visible() { return document.visibilityState !== 'hidden'; }
    var start = performance.now();
    var dirty = true;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, U.maxDpr);
      var rw = Math.max(1, Math.round(bounds.width * dpr)), rh = Math.max(1, Math.round(bounds.height * dpr));
      var ps = Math.min(1, Math.sqrt(U.maxPixels / Math.max(1, rw * rh)));
      var w = Math.max(1, Math.round(rw * ps)), h = Math.max(1, Math.round(rh * ps));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    }
    function request() { if (!disposed && raf === 0) raf = requestAnimationFrame(render); }

    function updatePointer() {
      if (!pointerKnown || bounds.width === 0 || bounds.height === 0) return;
      var inside = pcx >= bounds.left && pcx <= bounds.right && pcy >= bounds.top && pcy <= bounds.bottom;
      if (!inside) { targetPresence = 0; request(); return; }
      var nx = ((pcx - bounds.left) / bounds.width) * 2 - 1;
      var ny = -(((pcy - bounds.top) / bounds.height) * 2 - 1);
      if (targetPresence === 0 && cursorPresence < 0.01) { mouseX = nx; mouseY = ny; }
      targetX = nx; targetY = ny; targetPresence = 1; request();
    }
    function onMove(e) { pointerKnown = true; pcx = e.clientX; pcy = e.clientY; updatePointer(); }
    function onLeave() { pointerKnown = false; targetPresence = 0; request(); }
    function onLayout() {
      var next = canvas.getBoundingClientRect();
      // A phone's address bar collapsing changes the viewport by a few percent
      // on every scroll; resizing the buffer for that clears it to black for a
      // frame and reads as a strobe. Ignore small changes.
      if (bounds.width && Math.abs(next.width - bounds.width) / bounds.width < 0.15 && Math.abs(next.height - bounds.height) / bounds.height < 0.15) { bounds = next; updatePointer(); return; }
      bounds = next; resize(); updatePointer(); dirty = true;
      // Redraw in the same task the resize happened in, so the cleared buffer
      // is never composited.
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      render(performance.now());
    }
    window.addEventListener('resize', onLayout);
    if (U.cursorEnabled) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointercancel', onLeave);
      window.addEventListener('blur', onLeave);
      document.documentElement.addEventListener('pointerleave', onLeave);
    }
    var ro = new ResizeObserver(onLayout); ro.observe(canvas);
    function onVis() { if (visible()) request(); else if (raf) { cancelAnimationFrame(raf); raf = 0; lastNow = null; } }
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pageshow', onVis);
    window.addEventListener('focus', onVis);

    function render(now) {
      raf = 0;
      if (disposed) return;
      var dt = lastNow === null ? 0 : Math.min((now - lastNow) / 1000, 0.1);
      lastNow = now;
      var follow = 1 - Math.exp(-12 * dt);
      mouseX += (targetX - mouseX) * follow; mouseY += (targetY - mouseY) * follow;
      cursorPresence += (targetPresence - cursorPresence) * follow;
      resize();
      gl.uniform4f(uni.u_scene, canvas.width, canvas.height, ((now - start) / 1000) * U.timeScale, U.colorCount);
      gl.uniform4f(uni.u_shape, U.scale, U.intensity, U.paramA, U.warp);
      gl.uniform4f(uni.u_surface, U.detail, U.contrast, U.brightness, U.saturation);
      gl.uniform4f(uni.u_finish, U.hue, U.vignette, U.blur, U.grain);
      gl.uniform4f(uni.u_transform, U.seed, U.rotate, U.drift, U.oklab);
      gl.uniform4f(uni.u_space, U.offsetX, U.offsetY, mouseX, mouseY);
      gl.uniform4f(uni.u_cursor, U.cursorEnabled ? cursorPresence : 0, U.cursorEffect, U.cursorStrength, U.cursorRadius);
      gl.uniform4f(uni.u_shade, U.shadeBase, U.shadeHighlight, U.shadeShadow, 0);
      gl.uniform1f(uni.u_useFace, hasFace ? 1.0 : 0.0);
      if (hasFace) { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, faceTex); gl.uniform1i(uni.u_faceTex, 0); }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      dirty = false;
      var settling = Math.abs(targetX - mouseX) > 0.001 || Math.abs(targetY - mouseY) > 0.001 || Math.abs(targetPresence - cursorPresence) > 0.001;
      if (Math.abs(U.timeScale) > 0.0001 || settling || dirty) request(); else lastNow = null;
    }
    resize();
    // First frame synchronously. With alpha:false an undrawn buffer is opaque
    // black, and a page that loads in a hidden tab or an embedded pane gets no
    // animation frame until it is shown; a screenshot taken before then would
    // show a black pane. The tail of render() queues the loop.
    render(performance.now());

    return {
      set: function (k, v) { if (U[k] !== v) { U[k] = v; dirty = true; request(); } },
      get: function (k) { return U[k]; },
      dispose: function () {
        disposed = true; cancelAnimationFrame(raf); ro.disconnect();
        document.removeEventListener('visibilitychange', onVis); window.removeEventListener('resize', onLayout);
        if (U.cursorEnabled) { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointercancel', onLeave); window.removeEventListener('blur', onLeave); document.documentElement.removeEventListener('pointerleave', onLeave); }
        gl.deleteBuffer(buf); gl.deleteProgram(program);
        var ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext();
      }
    };
  }

  global.NHGlass = { mount: mount, hexToRgb: hexToRgb };
})(window);
