/* global Prism */

var string =
  /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

Prism.languages.webvtt = {
  doctype: /WEBVTT/,
  comment: {
    pattern: /(NOTE\s)(.|\s)+?(?=\n\n|$)/,
    lookbehind: true,
  },
  region: {
    pattern: /(REGION\s)(.|\s)+?(?=\n\n)/,
    lookbehind: true,
    inside: {
      number: {
        pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)%?/,
        lookbehind: true,
      },
      string: {
        pattern: /(:)[^\s]+/,
        lookbehind: true,
      },
      property: {
        pattern: /[A-Za-z]+/,
      },
      punctuation: /[:,]/,
    },
  },
  style: {
    pattern: /(STYLE\s)(.|\s)+?(?=\n\n)/,
    lookbehind: true,
    inside: {
      comment: /\/\*[\s\S]*?\*\//,
      selector: {
        pattern: RegExp(
          "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
            string.source +
            ")*(?=\\s*\\{)",
        ),
        lookbehind: true,
      },
      string: {
        pattern: string,
        greedy: true,
      },
      property: {
        pattern:
          /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: true,
      },
      important: /!important\b/i,
      function: {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: true,
      },
      punctuation: /[(){};:,]/,
    },
  },
  keyword: /NOTE|REGION|STYLE/,
  "cue-settings": {
    pattern:
      /(((\d\d:){1,2}\d\d.\d\d\d\s+-->\s+(\d\d:){1,2}\d\d.\d\d\d)[^\S\r\n]+).+/,
    lookbehind: true,
    inside: {
      number: {
        pattern: /(:)[\d%.-]+/,
        lookbehind: true,
      },
      string: {
        pattern: /(:)[^\s]+/,
        lookbehind: true,
      },
      property: {
        pattern: /[A-Za-z]+/,
      },
      punctuation: /:/,
    },
  },
  "cue-timings": {
    pattern: /(\d\d:){1,2}\d\d.\d\d\d\s+-->\s+(\d\d:){1,2}\d\d.\d\d\d/,
    alias: "number",
    inside: {
      punctuation: [
        {
          pattern: /-->/,
        },
        {
          pattern: /[:.]/,
        },
      ],
    },
  },
  "cue-identifier": {
    pattern: /(\n\n).+/,
    lookbehind: true,
    alias: "class-name",
  },
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>/:]+:/,
        },
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [
            {
              pattern: /^=/,
              alias: "attr-equals",
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true,
            },
          ],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>/]+/,
        inside: {
          namespace: /^[^\s>/:]+:/,
        },
      },
    },
  },
};
