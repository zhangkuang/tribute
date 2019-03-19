(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tribute = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _TributeEvents = require("./TributeEvents");

var _TributeEvents2 = _interopRequireDefault(_TributeEvents);

var _TributeMenuEvents = require("./TributeMenuEvents");

var _TributeMenuEvents2 = _interopRequireDefault(_TributeMenuEvents);

var _TributeRange = require("./TributeRange");

var _TributeRange2 = _interopRequireDefault(_TributeRange);

var _TributeSearch = require("./TributeSearch");

var _TributeSearch2 = _interopRequireDefault(_TributeSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tribute = function () {
    function Tribute(_ref) {
        var _this = this;

        var _ref$values = _ref.values,
            values = _ref$values === undefined ? null : _ref$values,
            _ref$iframe = _ref.iframe,
            iframe = _ref$iframe === undefined ? null : _ref$iframe,
            _ref$selectClass = _ref.selectClass,
            selectClass = _ref$selectClass === undefined ? 'highlight' : _ref$selectClass,
            _ref$trigger = _ref.trigger,
            trigger = _ref$trigger === undefined ? '@' : _ref$trigger,
            _ref$autocompleteMode = _ref.autocompleteMode,
            autocompleteMode = _ref$autocompleteMode === undefined ? false : _ref$autocompleteMode,
            _ref$selectTemplate = _ref.selectTemplate,
            selectTemplate = _ref$selectTemplate === undefined ? null : _ref$selectTemplate,
            _ref$menuItemTemplate = _ref.menuItemTemplate,
            menuItemTemplate = _ref$menuItemTemplate === undefined ? null : _ref$menuItemTemplate,
            _ref$lookup = _ref.lookup,
            lookup = _ref$lookup === undefined ? 'key' : _ref$lookup,
            _ref$fillAttr = _ref.fillAttr,
            fillAttr = _ref$fillAttr === undefined ? 'value' : _ref$fillAttr,
            _ref$collection = _ref.collection,
            collection = _ref$collection === undefined ? null : _ref$collection,
            _ref$menuContainer = _ref.menuContainer,
            menuContainer = _ref$menuContainer === undefined ? null : _ref$menuContainer,
            _ref$noMatchTemplate = _ref.noMatchTemplate,
            noMatchTemplate = _ref$noMatchTemplate === undefined ? null : _ref$noMatchTemplate,
            _ref$requireLeadingSp = _ref.requireLeadingSpace,
            requireLeadingSpace = _ref$requireLeadingSp === undefined ? true : _ref$requireLeadingSp,
            _ref$allowSpaces = _ref.allowSpaces,
            allowSpaces = _ref$allowSpaces === undefined ? false : _ref$allowSpaces,
            _ref$replaceTextSuffi = _ref.replaceTextSuffix,
            replaceTextSuffix = _ref$replaceTextSuffi === undefined ? null : _ref$replaceTextSuffi,
            _ref$positionMenu = _ref.positionMenu,
            positionMenu = _ref$positionMenu === undefined ? true : _ref$positionMenu,
            _ref$spaceSelectsMatc = _ref.spaceSelectsMatch,
            spaceSelectsMatch = _ref$spaceSelectsMatc === undefined ? false : _ref$spaceSelectsMatc,
            _ref$searchOpts = _ref.searchOpts,
            searchOpts = _ref$searchOpts === undefined ? {} : _ref$searchOpts;

        _classCallCheck(this, Tribute);

        this.autocompleteMode = autocompleteMode;
        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;
        this.allowSpaces = allowSpaces;
        this.replaceTextSuffix = replaceTextSuffix;
        this.positionMenu = positionMenu;
        this.hasTrailingSpace = false;
        this.spaceSelectsMatch = spaceSelectsMatch;

        if (this.autocompleteMode) {
            trigger = '';
            allowSpaces = false;
        }

        if (values) {
            this.collection = [{
                // symbol that starts the lookup
                trigger: trigger,

                // is it wrapped in an iframe
                iframe: iframe,

                // class applied to selected item
                selectClass: selectClass,

                // function called on select that retuns the content to insert
                selectTemplate: (selectTemplate || Tribute.defaultSelectTemplate).bind(this),

                // function called that returns content for an item
                menuItemTemplate: (menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(this),

                // function called when menu is empty, disables hiding of menu.
                noMatchTemplate: function (t) {
                    if (typeof t === 'function') {
                        return t.bind(_this);
                    }

                    return noMatchTemplate || function () {
                        return '';
                    }.bind(_this);
                }(noMatchTemplate),

                // column to search against in the object
                lookup: lookup,

                // column that contains the content to insert by default
                fillAttr: fillAttr,

                // array of objects or a function returning an array of objects
                values: values,

                requireLeadingSpace: requireLeadingSpace,

                searchOpts: searchOpts
            }];
        } else if (collection) {
            if (this.autocompleteMode) console.warn('Tribute in autocomplete mode does not work for collections');
            this.collection = collection.map(function (item) {
                return {
                    trigger: item.trigger || trigger,
                    iframe: item.iframe || iframe,
                    selectClass: item.selectClass || selectClass,
                    selectTemplate: (item.selectTemplate || Tribute.defaultSelectTemplate).bind(_this),
                    menuItemTemplate: (item.menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(_this),
                    // function called when menu is empty, disables hiding of menu.
                    noMatchTemplate: function (t) {
                        if (typeof t === 'function') {
                            return t.bind(_this);
                        }

                        return null;
                    }(noMatchTemplate),
                    lookup: item.lookup || lookup,
                    fillAttr: item.fillAttr || fillAttr,
                    values: item.values,
                    requireLeadingSpace: item.requireLeadingSpace,
                    searchOpts: item.searchOpts || searchOpts
                };
            });
        } else {
            throw new Error('[Tribute] No collection specified.');
        }

        new _TributeRange2.default(this);
        new _TributeEvents2.default(this);
        new _TributeMenuEvents2.default(this);
        new _TributeSearch2.default(this);
    }

    _createClass(Tribute, [{
        key: "triggers",
        value: function triggers() {
            return this.collection.map(function (config) {
                return config.trigger;
            });
        }
    }, {
        key: "attach",
        value: function attach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._attach(el[i]);
                }
            } else {
                this._attach(el);
            }
        }
    }, {
        key: "_attach",
        value: function _attach(el) {
            if (el.hasAttribute('data-tribute')) {
                console.warn('Tribute was already bound to ' + el.nodeName);
            }

            this.ensureEditable(el);
            this.events.bind(el);
            el.setAttribute('data-tribute', true);
        }
    }, {
        key: "ensureEditable",
        value: function ensureEditable(element) {
            if (Tribute.inputTypes().indexOf(element.nodeName) === -1) {
                if (element.contentEditable) {
                    element.contentEditable = true;
                } else {
                    throw new Error('[Tribute] Cannot bind to ' + element.nodeName);
                }
            }
        }
    }, {
        key: "createMenu",
        value: function createMenu() {
            var wrapper = this.range.getDocument().createElement('div'),
                ul = this.range.getDocument().createElement('ul');

            wrapper.className = 'tribute-container';
            wrapper.appendChild(ul);

            if (this.menuContainer) {
                return this.menuContainer.appendChild(wrapper);
            }

            return this.range.getDocument().body.appendChild(wrapper);
        }
    }, {
        key: "showMenuFor",
        value: function showMenuFor(element, scrollTo) {
            var _this2 = this;

            // Only proceed if menu isn't already shown for the current element & mentionText
            if (this.isActive && this.current.element === element && this.current.mentionText === this.currentMentionTextSnapshot) {
                return;
            }
            this.currentMentionTextSnapshot = this.current.mentionText;

            // create the menu if it doesn't exist.
            if (!this.menu) {
                this.menu = this.createMenu();
                element.tributeMenu = this.menu;
                this.menuEvents.bind(this.menu);
            }

            this.isActive = true;
            this.menuSelected = 0;

            if (!this.current.mentionText) {
                this.current.mentionText = '';
            }

            var processValues = function processValues(values) {
                // Tribute may not be active any more by the time the value callback returns
                if (!_this2.isActive) {
                    return;
                }

                var items = _this2.search.filter(_this2.current.mentionText, values, {
                    pre: _this2.current.collection.searchOpts.pre || '<span>',
                    post: _this2.current.collection.searchOpts.post || '</span>',
                    extract: function extract(el) {
                        if (typeof _this2.current.collection.lookup === 'string') {
                            return el[_this2.current.collection.lookup];
                        } else if (typeof _this2.current.collection.lookup === 'function') {
                            return _this2.current.collection.lookup(el, _this2.current.mentionText);
                        } else {
                            throw new Error('Invalid lookup attribute, lookup must be string or function.');
                        }
                    }
                });

                _this2.current.filteredItems = items;

                var ul = _this2.menu.querySelector('ul');

                _this2.range.positionMenuAtCaret(scrollTo);

                if (!items.length) {
                    var noMatchEvent = new CustomEvent('tribute-no-match', { detail: _this2.menu });
                    _this2.current.element.dispatchEvent(noMatchEvent);
                    if (!_this2.current.collection.noMatchTemplate) {
                        _this2.hideMenu();
                    } else {
                        ul.innerHTML = _this2.current.collection.noMatchTemplate();
                    }

                    return;
                }

                ul.innerHTML = '';

                items.forEach(function (item, index) {
                    var li = _this2.range.getDocument().createElement('li');
                    li.setAttribute('data-index', index);
                    li.addEventListener('mouseenter', function (e) {
                        var li = e.target;
                        var index = li.getAttribute('data-index');
                        if (e.movementX !== 0 && e.movementY !== 0) {
                            _this2.events.setActiveLi(index);
                        }
                    });
                    if (_this2.menuSelected === index) {
                        li.className = _this2.current.collection.selectClass;
                    }
                    li.innerHTML = _this2.current.collection.menuItemTemplate(item);
                    ul.appendChild(li);
                });
            };

            if (typeof this.current.collection.values === 'function') {
                this.current.collection.values(this.current.mentionText, processValues);
            } else {
                processValues(this.current.collection.values);
            }
        }
    }, {
        key: "showMenuForCollection",
        value: function showMenuForCollection(element, collectionIndex) {
            if (element !== document.activeElement) {
                this.placeCaretAtEnd(element);
            }

            this.current.collection = this.collection[collectionIndex || 0];
            this.current.externalTrigger = true;
            this.current.element = element;

            if (element.isContentEditable) this.insertTextAtCursor(this.current.collection.trigger);else this.insertAtCaret(element, this.current.collection.trigger);

            this.showMenuFor(element);
        }

        // TODO: make sure this works for inputs/textareas

    }, {
        key: "placeCaretAtEnd",
        value: function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }

        // for contenteditable

    }, {
        key: "insertTextAtCursor",
        value: function insertTextAtCursor(text) {
            var sel, range, html;
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            range.deleteContents();
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }

        // for regular inputs

    }, {
        key: "insertAtCaret",
        value: function insertAtCaret(textarea, text) {
            var scrollPos = textarea.scrollTop;
            var caretPos = textarea.selectionStart;

            var front = textarea.value.substring(0, caretPos);
            var back = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
            textarea.value = front + text + back;
            caretPos = caretPos + text.length;
            textarea.selectionStart = caretPos;
            textarea.selectionEnd = caretPos;
            textarea.focus();
            textarea.scrollTop = scrollPos;
        }
    }, {
        key: "hideMenu",
        value: function hideMenu() {
            if (this.menu) {
                this.menu.style.cssText = 'display: none;';
                this.isActive = false;
                this.menuSelected = 0;
                this.current = {};
            }
        }
    }, {
        key: "selectItemAtIndex",
        value: function selectItemAtIndex(index, originalEvent) {
            index = parseInt(index);
            if (typeof index !== 'number' || isNaN(index)) return;
            var item = this.current.filteredItems[index];
            var content = this.current.collection.selectTemplate(item);
            if (content !== null) this.replaceText(content, originalEvent, item);
        }
    }, {
        key: "replaceText",
        value: function replaceText(content, originalEvent, item) {
            this.range.replaceTriggerText(content, true, true, originalEvent, item);
        }
    }, {
        key: "_append",
        value: function _append(collection, newValues, replace) {
            if (typeof collection.values === 'function') {
                throw new Error('Unable to append to values, as it is a function.');
            } else if (!replace) {
                collection.values = collection.values.concat(newValues);
            } else {
                collection.values = newValues;
            }
        }
    }, {
        key: "append",
        value: function append(collectionIndex, newValues, replace) {
            var index = parseInt(collectionIndex);
            if (typeof index !== 'number') throw new Error('please provide an index for the collection to update.');

            var collection = this.collection[index];

            this._append(collection, newValues, replace);
        }
    }, {
        key: "appendCurrent",
        value: function appendCurrent(newValues, replace) {
            if (this.isActive) {
                this._append(this.current.collection, newValues, replace);
            } else {
                throw new Error('No active state. Please use append instead and pass an index.');
            }
        }
    }, {
        key: "detach",
        value: function detach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._detach(el[i]);
                }
            } else {
                this._detach(el);
            }
        }
    }, {
        key: "_detach",
        value: function _detach(el) {
            var _this3 = this;

            this.events.unbind(el);
            if (el.tributeMenu) {
                this.menuEvents.unbind(el.tributeMenu);
            }

            setTimeout(function () {
                el.removeAttribute('data-tribute');
                _this3.isActive = false;
                if (el.tributeMenu) {
                    el.tributeMenu.remove();
                }
            });
        }
    }], [{
        key: "defaultSelectTemplate",
        value: function defaultSelectTemplate(item) {
            if (typeof item === 'undefined') return null;
            if (this.range.isContentEditable(this.current.element)) {
                return '<span class="tribute-mention">' + (this.current.collection.trigger + item.original[this.current.collection.fillAttr]) + '</span>';
            }

            return this.current.collection.trigger + item.original[this.current.collection.fillAttr];
        }
    }, {
        key: "defaultMenuItemTemplate",
        value: function defaultMenuItemTemplate(matchItem) {
            return matchItem.string;
        }
    }, {
        key: "inputTypes",
        value: function inputTypes() {
            return ['TEXTAREA', 'INPUT'];
        }
    }]);

    return Tribute;
}();

exports.default = Tribute;
module.exports = exports.default;

},{"./TributeEvents":2,"./TributeMenuEvents":3,"./TributeRange":4,"./TributeSearch":5,"./utils":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeEvents = function () {
    function TributeEvents(tribute) {
        _classCallCheck(this, TributeEvents);

        this.tribute = tribute;
        this.tribute.events = this;
    }

    _createClass(TributeEvents, [{
        key: 'bind',
        value: function bind(element) {
            element.boundKeydown = this.keydown.bind(element, this);
            element.boundKeyup = this.keyup.bind(element, this);
            element.boundInput = this.input.bind(element, this);

            element.addEventListener('keydown', element.boundKeydown, false);
            element.addEventListener('keyup', element.boundKeyup, false);
            element.addEventListener('input', element.boundInput, false);
        }
    }, {
        key: 'unbind',
        value: function unbind(element) {
            element.removeEventListener('keydown', element.boundKeydown, false);
            element.removeEventListener('keyup', element.boundKeyup, false);
            element.removeEventListener('input', element.boundInput, false);

            delete element.boundKeydown;
            delete element.boundKeyup;
            delete element.boundInput;
        }
    }, {
        key: 'keydown',
        value: function keydown(instance, event) {
            if (instance.shouldDeactivate(event)) {
                instance.tribute.isActive = false;
                instance.tribute.hideMenu();
            }

            var element = this;
            instance.commandEvent = false;

            TributeEvents.keys().forEach(function (o) {
                if (o.key === event.keyCode) {
                    instance.commandEvent = true;
                    instance.callbacks()[o.value.toLowerCase()](event, element);
                }
            });
        }
    }, {
        key: 'input',
        value: function input(instance, event) {
            instance.inputEvent = true;
            instance.keyup.call(this, instance, event);
        }
    }, {
        key: 'click',
        value: function click(instance, event) {
            var tribute = instance.tribute;
            if (tribute.menu && tribute.menu.contains(event.target)) {
                var li = event.target;
                event.preventDefault();
                event.stopPropagation();
                while (li.nodeName.toLowerCase() !== 'li') {
                    li = li.parentNode;
                    if (!li || li === tribute.menu) {
                        throw new Error('cannot find the <li> container for the click');
                    }
                }
                tribute.selectItemAtIndex(li.getAttribute('data-index'), event);
                tribute.hideMenu();

                // TODO: should fire with externalTrigger and target is outside of menu
            } else if (tribute.current.element && !tribute.current.externalTrigger) {
                tribute.current.externalTrigger = false;
                setTimeout(function () {
                    return tribute.hideMenu();
                });
            }
        }
    }, {
        key: 'keyup',
        value: function keyup(instance, event) {
            if (instance.inputEvent) {
                instance.inputEvent = false;
            }
            instance.updateSelection(this);

            if (event.keyCode === 27) return;

            if (!instance.tribute.allowSpaces && instance.tribute.hasTrailingSpace) {
                instance.tribute.hasTrailingSpace = false;
                instance.commandEvent = true;
                instance.callbacks()["space"](event, this);
                return;
            }

            if (!instance.tribute.isActive) {
                if (instance.tribute.autocompleteMode) {
                    instance.callbacks().triggerChar(event, this, '');
                } else {
                    var keyCode = instance.getKeyCode(instance, this, event);

                    if (isNaN(keyCode) || !keyCode) return;

                    var trigger = instance.tribute.triggers().find(function (trigger) {
                        return trigger.charCodeAt(0) === keyCode;
                    });

                    if (typeof trigger !== 'undefined') {
                        instance.callbacks().triggerChar(event, this, trigger);
                    }
                }
            }

            if ((instance.tribute.current.trigger || instance.tribute.autocompleteMode) && instance.commandEvent === false || instance.tribute.isActive && event.keyCode === 8) {
                instance.tribute.showMenuFor(this, true);
            }
        }
    }, {
        key: 'shouldDeactivate',
        value: function shouldDeactivate(event) {
            if (!this.tribute.isActive) return false;

            if (this.tribute.current.mentionText.length === 0) {
                var eventKeyPressed = false;
                TributeEvents.keys().forEach(function (o) {
                    if (event.keyCode === o.key) eventKeyPressed = true;
                });

                return !eventKeyPressed;
            }

            return false;
        }
    }, {
        key: 'getKeyCode',
        value: function getKeyCode(instance, el, event) {
            var char = void 0;
            var tribute = instance.tribute;
            var info = tribute.range.getTriggerInfo(false, tribute.hasTrailingSpace, true, tribute.allowSpaces, tribute.autocompleteMode);

            if (info) {
                return info.mentionTriggerChar.charCodeAt(0);
            } else {
                return false;
            }
        }
    }, {
        key: 'updateSelection',
        value: function updateSelection(el) {
            this.tribute.current.element = el;
            var info = this.tribute.range.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autocompleteMode);

            if (info) {
                this.tribute.current.selectedPath = info.mentionSelectedPath;
                this.tribute.current.mentionText = info.mentionText;
                this.tribute.current.selectedOffset = info.mentionSelectedOffset;
            }
        }
    }, {
        key: 'callbacks',
        value: function callbacks() {
            var _this = this;

            return {
                triggerChar: function triggerChar(e, el, trigger) {
                    var tribute = _this.tribute;
                    tribute.current.trigger = trigger;

                    var collectionItem = tribute.collection.find(function (item) {
                        return item.trigger === trigger;
                    });

                    tribute.current.collection = collectionItem;
                    if (tribute.inputEvent) tribute.showMenuFor(el, true);
                },
                enter: function enter(e, el) {
                    // choose selection
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(function () {
                            _this.tribute.selectItemAtIndex(_this.tribute.menuSelected, e);
                            _this.tribute.hideMenu();
                        }, 0);
                    }
                },
                escape: function escape(e, el) {
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.tribute.isActive = false;
                        _this.tribute.hideMenu();
                    }
                },
                tab: function tab(e, el) {
                    // choose first match
                    _this.callbacks().enter(e, el);
                },
                space: function space(e, el) {
                    if (_this.tribute.isActive) {
                        if (_this.tribute.spaceSelectsMatch) {
                            _this.callbacks().enter(e, el);
                        } else if (!_this.tribute.allowSpaces) {
                            e.stopPropagation();
                            setTimeout(function () {
                                _this.tribute.hideMenu();
                                _this.tribute.isActive = false;
                            }, 0);
                        }
                    }
                },
                up: function up(e, el) {
                    // navigate up ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length,
                            selected = _this.tribute.menuSelected;

                        if (count > selected && selected > 0) {
                            _this.tribute.menuSelected--;
                            _this.setActiveLi();
                        } else if (selected === 0) {
                            _this.tribute.menuSelected = count - 1;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = _this.tribute.menu.scrollHeight;
                        }
                    }
                },
                down: function down(e, el) {
                    // navigate down ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length - 1,
                            selected = _this.tribute.menuSelected;

                        if (count > selected) {
                            _this.tribute.menuSelected++;
                            _this.setActiveLi();
                        } else if (count === selected) {
                            _this.tribute.menuSelected = 0;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = 0;
                        }
                    }
                },
                delete: function _delete(e, el) {
                    if (_this.tribute.isActive && _this.tribute.current.mentionText.length < 1) {
                        _this.tribute.hideMenu();
                    } else if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(el);
                    }
                }
            };
        }
    }, {
        key: 'setActiveLi',
        value: function setActiveLi(index) {
            var lis = this.tribute.menu.querySelectorAll('li'),
                length = lis.length >>> 0;

            if (index) this.tribute.menuSelected = parseInt(index);

            for (var i = 0; i < length; i++) {
                var li = lis[i];
                if (i === this.tribute.menuSelected) {
                    li.classList.add(this.tribute.current.collection.selectClass);

                    var liClientRect = li.getBoundingClientRect();
                    var menuClientRect = this.tribute.menu.getBoundingClientRect();

                    if (liClientRect.bottom > menuClientRect.bottom) {
                        var scrollDistance = liClientRect.bottom - menuClientRect.bottom;
                        this.tribute.menu.scrollTop += scrollDistance;
                    } else if (liClientRect.top < menuClientRect.top) {
                        var _scrollDistance = menuClientRect.top - liClientRect.top;
                        this.tribute.menu.scrollTop -= _scrollDistance;
                    }
                } else {
                    li.classList.remove(this.tribute.current.collection.selectClass);
                }
            }
        }
    }, {
        key: 'getFullHeight',
        value: function getFullHeight(elem, includeMargin) {
            var height = elem.getBoundingClientRect().height;

            if (includeMargin) {
                var style = elem.currentStyle || window.getComputedStyle(elem);
                return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            }

            return height;
        }
    }], [{
        key: 'keys',
        value: function keys() {
            return [{
                key: 9,
                value: 'TAB'
            }, {
                key: 8,
                value: 'DELETE'
            }, {
                key: 13,
                value: 'ENTER'
            }, {
                key: 27,
                value: 'ESCAPE'
            }, {
                key: 32,
                value: 'SPACE'
            }, {
                key: 38,
                value: 'UP'
            }, {
                key: 40,
                value: 'DOWN'
            }];
        }
    }]);

    return TributeEvents;
}();

exports.default = TributeEvents;
module.exports = exports.default;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeMenuEvents = function () {
    function TributeMenuEvents(tribute) {
        _classCallCheck(this, TributeMenuEvents);

        this.tribute = tribute;
        this.tribute.menuEvents = this;
        this.menu = this.tribute.menu;
    }

    _createClass(TributeMenuEvents, [{
        key: 'bind',
        value: function bind(menu) {
            var _this = this;

            this.menuClickEvent = this.tribute.events.click.bind(null, this);
            this.menuContainerScrollEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.showMenuFor(_this.tribute.current.element, false);
                }
            }, 300, false);
            this.windowResizeEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.range.positionMenuAtCaret(true);
                }
            }, 300, false);

            // fixes IE11 issues with mousedown
            this.tribute.range.getDocument().addEventListener('MSPointerDown', this.menuClickEvent, false);
            this.tribute.range.getDocument().addEventListener('mousedown', this.menuClickEvent, false);
            window.addEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.addEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.addEventListener('scroll', this.menuContainerScrollEvent);
            }
        }
    }, {
        key: 'unbind',
        value: function unbind(menu) {
            this.tribute.range.getDocument().removeEventListener('mousedown', this.menuClickEvent, false);
            this.tribute.range.getDocument().removeEventListener('MSPointerDown', this.menuClickEvent, false);
            window.removeEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.removeEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.removeEventListener('scroll', this.menuContainerScrollEvent);
            }
        }
    }, {
        key: 'debounce',
        value: function debounce(func, wait, immediate) {
            var _this2 = this,
                _arguments = arguments;

            var timeout;
            return function () {
                var context = _this2,
                    args = _arguments;
                var later = function later() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    }]);

    return TributeMenuEvents;
}();

exports.default = TributeMenuEvents;
module.exports = exports.default;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/jeff-collins/ment.io
var TributeRange = function () {
  function TributeRange(tribute) {
    _classCallCheck(this, TributeRange);

    this.tribute = tribute;
    this.tribute.range = this;
  }

  _createClass(TributeRange, [{
    key: 'getDocument',
    value: function getDocument() {
      var iframe = void 0;
      if (this.tribute.current.collection) {
        iframe = this.tribute.current.collection.iframe;
      }

      if (!iframe) {
        return document;
      }

      return iframe.contentWindow.document;
    }
  }, {
    key: 'positionMenuAtCaret',
    value: function positionMenuAtCaret(scrollTo) {
      var _this = this;

      var context = this.tribute.current,
          coordinates = void 0;

      var info = this.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autocompleteMode);

      if (typeof info !== 'undefined') {

        if (typeof this.tribute.positionMenu === 'boolean' && !this.tribute.positionMenu) {
          this.tribute.menu.style.cssText = 'display: block;';
          return;
        }

        if (!this.isContentEditable(context.element)) {
          coordinates = this.getTextAreaOrInputUnderlinePosition(this.tribute.current.element, info.mentionPosition);
        } else {
          coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
        }
        if (_typeof(this.tribute.positionMenu) === 'object') {
          var positionMenu = this.tribute.positionMenu;

          coordinates.left = coordinates.left + (positionMenu.fontSize || 12) - positionMenu.width / 2;
        }
        this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                     left: ' + coordinates.left + 'px;\n                                     right: ' + coordinates.right + 'px;\n                                     bottom: ' + coordinates.bottom + 'px;\n                                     position: absolute;\n                                     zIndex: 10000;\n                                     display: block;';

        if (coordinates.left === 'auto') {
          this.tribute.menu.style.left = 'auto';
        }

        if (coordinates.top === 'auto') {
          this.tribute.menu.style.top = 'auto';
        }

        if (scrollTo) this.scrollIntoView();

        window.setTimeout(function () {
          var menuDimensions = {
            width: _this.tribute.menu.offsetWidth,
            height: _this.tribute.menu.offsetHeight
          };
          var menuIsOffScreen = _this.isMenuOffScreen(coordinates, menuDimensions);

          var menuIsOffScreenHorizontally = window.innerWidth > menuDimensions.width && (menuIsOffScreen.left || menuIsOffScreen.right);
          var menuIsOffScreenVertically = window.innerHeight > menuDimensions.height && (menuIsOffScreen.top || menuIsOffScreen.bottom);
          if (menuIsOffScreenHorizontally || menuIsOffScreenVertically) {
            _this.tribute.menu.style.cssText = 'display: none';
            _this.positionMenuAtCaret(scrollTo);
          }
        }, 0);
      } else {
        this.tribute.menu.style.cssText = 'display: none';
      }
    }
  }, {
    key: 'selectElement',
    value: function selectElement(targetElement, path, offset) {
      var range = void 0;
      var elem = targetElement;

      if (path) {
        for (var i = 0; i < path.length; i++) {
          elem = elem.childNodes[path[i]];
          if (elem === undefined) {
            return;
          }
          while (elem.length < offset) {
            offset -= elem.length;
            elem = elem.nextSibling;
          }
          if (elem.childNodes.length === 0 && !elem.length) {
            elem = elem.previousSibling;
          }
        }
      }
      var sel = this.getWindowSelection();

      range = this.getDocument().createRange();
      range.setStart(elem, offset);
      range.setEnd(elem, offset);
      range.collapse(true);

      try {
        sel.removeAllRanges();
      } catch (error) {}

      sel.addRange(range);
      targetElement.focus();
    }
  }, {
    key: 'replaceTriggerText',
    value: function replaceTriggerText(text, requireLeadingSpace, hasTrailingSpace, originalEvent, item) {
      var context = this.tribute.current;
      var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces, this.tribute.autocompleteMode);

      // Create the event
      var replaceEvent = new CustomEvent('tribute-replaced', {
        detail: {
          item: item,
          event: originalEvent
        }
      });

      if (info !== undefined) {
        if (!this.isContentEditable(context.element)) {
          var myField = this.tribute.current.element;
          var textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : ' ';
          text += textSuffix;
          var startPos = info.mentionPosition;
          var endPos = info.mentionPosition + info.mentionText.length + textSuffix.length;
          myField.value = myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
          myField.selectionStart = startPos + text.length;
          myField.selectionEnd = startPos + text.length;
        } else {
          // add a space to the end of the pasted text
          var _textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : '\xA0';
          text += _textSuffix;
          this.pasteHtml(text, info.mentionPosition, info.mentionPosition + info.mentionText.length + !this.tribute.autocompleteMode);
        }

        context.element.dispatchEvent(replaceEvent);
      }
    }
  }, {
    key: 'pasteHtml',
    value: function pasteHtml(html, startPos, endPos) {
      var range = void 0,
          sel = void 0;
      sel = this.getWindowSelection();
      range = this.getDocument().createRange();
      range.setStart(sel.anchorNode, startPos);
      range.setEnd(sel.anchorNode, endPos);
      range.deleteContents();

      var el = this.getDocument().createElement('div');
      el.innerHTML = html;
      var frag = this.getDocument().createDocumentFragment(),
          node = void 0,
          lastNode = void 0;
      while (node = el.firstChild) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, {
    key: 'getWindowSelection',
    value: function getWindowSelection() {
      if (this.tribute.collection.iframe) {
        return this.tribute.collection.iframe.contentWindow.getSelection();
      }

      return window.getSelection();
    }
  }, {
    key: 'getNodePositionInParent',
    value: function getNodePositionInParent(element) {
      if (element.parentNode === null) {
        return 0;
      }

      for (var i = 0; i < element.parentNode.childNodes.length; i++) {
        var node = element.parentNode.childNodes[i];

        if (node === element) {
          return i;
        }
      }
    }
  }, {
    key: 'getContentEditableSelectedPath',
    value: function getContentEditableSelectedPath(ctx) {
      var sel = this.getWindowSelection();
      var selected = sel.anchorNode;
      var path = [];
      var offset = void 0;

      if (selected != null) {
        var i = void 0;
        var ce = selected.contentEditable;
        while (selected !== null && ce !== 'true') {
          i = this.getNodePositionInParent(selected);
          path.push(i);
          selected = selected.parentNode;
          if (selected !== null) {
            ce = selected.contentEditable;
          }
        }
        path.reverse();

        // getRangeAt may not exist, need alternative
        offset = sel.getRangeAt(0).startOffset;

        return {
          selected: selected,
          path: path,
          offset: offset
        };
      }
    }
  }, {
    key: 'getTextPrecedingCurrentSelection',
    value: function getTextPrecedingCurrentSelection() {
      var context = this.tribute.current,
          text = '';

      if (!this.isContentEditable(context.element)) {
        var textComponent = this.tribute.current.element;
        if (textComponent) {
          var startPos = textComponent.selectionStart;
          if (textComponent.value && startPos >= 0) {
            text = textComponent.value.substring(0, startPos);
          }
        }
      } else {
        var selectedElem = this.getWindowSelection().anchorNode;

        if (selectedElem != null) {
          var workingNodeContent = selectedElem.textContent;
          var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

          if (workingNodeContent && selectStartOffset >= 0) {
            text = workingNodeContent.substring(0, selectStartOffset);
          }
        }
      }

      return text;
    }
  }, {
    key: 'getLastWordInText',
    value: function getLastWordInText(text) {
      text = text.replace(/\u00A0/g, ' '); // https://stackoverflow.com/questions/29850407/how-do-i-replace-unicode-character-u00a0-with-a-space-in-javascript
      var wordsArray = text.split(' ');
      var worldsCount = wordsArray.length - 1;
      return wordsArray[worldsCount].trim();
    }
  }, {
    key: 'getTriggerInfo',
    value: function getTriggerInfo(menuAlreadyActive, hasTrailingSpace, requireLeadingSpace, allowSpaces, isAutocomplete) {
      var _this2 = this;

      var ctx = this.tribute.current;
      var selected = void 0,
          path = void 0,
          offset = void 0;

      if (!this.isContentEditable(ctx.element)) {
        selected = this.tribute.current.element;
      } else {
        var selectionInfo = this.getContentEditableSelectedPath(ctx);

        if (selectionInfo) {
          selected = selectionInfo.selected;
          path = selectionInfo.path;
          offset = selectionInfo.offset;
        }
      }

      var effectiveRange = this.getTextPrecedingCurrentSelection();
      var lastWordOfEffectiveRange = this.getLastWordInText(effectiveRange);

      if (isAutocomplete) {
        return {
          mentionPosition: effectiveRange.length - lastWordOfEffectiveRange.length,
          mentionText: lastWordOfEffectiveRange,
          mentionSelectedElement: selected,
          mentionSelectedPath: path,
          mentionSelectedOffset: offset
        };
      }

      if (effectiveRange !== undefined && effectiveRange !== null) {
        var mostRecentTriggerCharPos = -1;
        var triggerChar = void 0;

        this.tribute.collection.forEach(function (config) {
          var c = config.trigger;
          var idx = config.requireLeadingSpace ? _this2.lastIndexWithLeadingSpace(effectiveRange, c) : effectiveRange.lastIndexOf(c);

          if (idx > mostRecentTriggerCharPos) {
            mostRecentTriggerCharPos = idx;
            triggerChar = c;
            requireLeadingSpace = config.requireLeadingSpace;
          }
        });

        if (mostRecentTriggerCharPos >= 0 && (mostRecentTriggerCharPos === 0 || !requireLeadingSpace || /[\xA0\s]/g.test(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)))) {
          var currentTriggerSnippet = effectiveRange.substring(mostRecentTriggerCharPos + 1, effectiveRange.length);

          triggerChar = effectiveRange.substring(mostRecentTriggerCharPos, mostRecentTriggerCharPos + 1);
          var firstSnippetChar = currentTriggerSnippet.substring(0, 1);
          var leadingSpace = currentTriggerSnippet.length > 0 && (firstSnippetChar === ' ' || firstSnippetChar === '\xA0');
          if (hasTrailingSpace) {
            currentTriggerSnippet = currentTriggerSnippet.trim();
          }

          var regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;

          this.tribute.hasTrailingSpace = regex.test(currentTriggerSnippet);

          if (!leadingSpace && (menuAlreadyActive || !regex.test(currentTriggerSnippet))) {
            return {
              mentionPosition: mostRecentTriggerCharPos,
              mentionText: currentTriggerSnippet,
              mentionSelectedElement: selected,
              mentionSelectedPath: path,
              mentionSelectedOffset: offset,
              mentionTriggerChar: triggerChar
            };
          }
        }
      }
    }
  }, {
    key: 'lastIndexWithLeadingSpace',
    value: function lastIndexWithLeadingSpace(str, char) {
      var reversedStr = str.split('').reverse().join('');
      var index = -1;

      for (var cidx = 0, len = str.length; cidx < len; cidx++) {
        var firstChar = cidx === str.length - 1;
        var leadingSpace = /\s/.test(reversedStr[cidx + 1]);
        var match = char === reversedStr[cidx];

        if (match && (firstChar || leadingSpace)) {
          index = str.length - 1 - cidx;
          break;
        }
      }

      return index;
    }
  }, {
    key: 'isContentEditable',
    value: function isContentEditable(element) {
      return element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA';
    }
  }, {
    key: 'isMenuOffScreen',
    value: function isMenuOffScreen(coordinates, menuDimensions) {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var doc = document.documentElement;
      var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      var menuTop = typeof coordinates.top === 'number' ? coordinates.top : windowTop + windowHeight - coordinates.bottom - menuDimensions.height;
      var menuRight = typeof coordinates.right === 'number' ? coordinates.right : coordinates.left + menuDimensions.width;
      var menuBottom = typeof coordinates.bottom === 'number' ? coordinates.bottom : coordinates.top + menuDimensions.height;
      var menuLeft = typeof coordinates.left === 'number' ? coordinates.left : windowLeft + windowWidth - coordinates.right - menuDimensions.width;

      return {
        top: menuTop < Math.floor(windowTop),
        right: menuRight > Math.ceil(windowLeft + windowWidth),
        bottom: menuBottom > Math.ceil(windowTop + windowHeight),
        left: menuLeft < Math.floor(windowLeft)
      };
    }
  }, {
    key: 'getMenuDimensions',
    value: function getMenuDimensions() {
      // Width of the menu depends of its contents and position
      // We must check what its width would be without any obstruction
      // This way, we can achieve good positioning for flipping the menu
      var dimensions = {
        width: null,
        height: null
      };

      this.tribute.menu.style.cssText = 'top: 0px;\n                                 left: 0px;\n                                 position: fixed;\n                                 zIndex: 10000;\n                                 display: block;\n                                 visibility; hidden;';
      dimensions.width = this.tribute.menu.offsetWidth;
      dimensions.height = this.tribute.menu.offsetHeight;

      this.tribute.menu.style.cssText = 'display: none;';

      return dimensions;
    }
  }, {
    key: 'getTextAreaOrInputUnderlinePosition',
    value: function getTextAreaOrInputUnderlinePosition(element, position, flipped) {
      var properties = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing'];

      var isFirefox = window.mozInnerScreenX !== null;

      var div = this.getDocument().createElement('div');
      div.id = 'input-textarea-caret-position-mirror-div';
      this.getDocument().body.appendChild(div);

      var style = div.style;
      var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

      style.whiteSpace = 'pre-wrap';
      if (element.nodeName !== 'INPUT') {
        style.wordWrap = 'break-word';
      }

      // position off-screen
      style.position = 'absolute';
      style.visibility = 'hidden';

      // transfer the element's properties to the div
      properties.forEach(function (prop) {
        style[prop] = computed[prop];
      });

      if (isFirefox) {
        style.width = parseInt(computed.width) - 2 + 'px';
        if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
      } else {
        style.overflow = 'hidden';
      }

      div.textContent = element.value.substring(0, position);

      if (element.nodeName === 'INPUT') {
        div.textContent = div.textContent.replace(/\s/g, ' ');
      }

      var span = this.getDocument().createElement('span');
      span.textContent = element.value.substring(position) || '.';
      div.appendChild(span);

      var rect = element.getBoundingClientRect();
      var doc = document.documentElement;
      var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      var coordinates = {
        top: rect.top + windowTop + span.offsetTop + parseInt(computed.borderTopWidth) + parseInt(computed.fontSize) - element.scrollTop,
        left: rect.left + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth)
      };

      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;

      var menuDimensions = this.getMenuDimensions();
      var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

      if (menuIsOffScreen.right) {
        coordinates.right = windowWidth - coordinates.left;
        coordinates.left = 'auto';
      }

      var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

      if (menuIsOffScreen.bottom) {
        var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
        var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

        coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top - span.offsetTop);
        coordinates.top = 'auto';
      }

      menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
      if (menuIsOffScreen.left) {
        coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
        delete coordinates.right;
      }
      if (menuIsOffScreen.top) {
        coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
        delete coordinates.bottom;
      }

      this.getDocument().body.removeChild(div);
      return coordinates;
    }
  }, {
    key: 'getContentEditableCaretPosition',
    value: function getContentEditableCaretPosition(selectedNodePosition) {
      var markerTextChar = '﻿';
      var markerEl = void 0,
          markerId = 'sel_' + new Date().getTime() + '_' + Math.random().toString().substr(2);
      var range = void 0;
      var sel = this.getWindowSelection();
      var prevRange = sel.getRangeAt(0);

      range = this.getDocument().createRange();
      range.setStart(sel.anchorNode, selectedNodePosition);
      range.setEnd(sel.anchorNode, selectedNodePosition);

      range.collapse(false);

      // Create the marker element containing a single invisible character using DOM methods and insert it
      markerEl = this.getDocument().createElement('span');
      markerEl.id = markerId;

      markerEl.appendChild(this.getDocument().createTextNode(markerTextChar));
      range.insertNode(markerEl);
      sel.removeAllRanges();
      sel.addRange(prevRange);

      var rect = markerEl.getBoundingClientRect();
      var doc = document.documentElement;
      var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      var coordinates = {
        left: rect.left + windowLeft,
        top: rect.top + markerEl.offsetHeight + windowTop
      };
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;

      var menuDimensions = this.getMenuDimensions();
      var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

      if (menuIsOffScreen.right) {
        coordinates.left = 'auto';
        coordinates.right = windowWidth - rect.left - windowLeft;
      }

      var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

      if (menuIsOffScreen.bottom) {
        var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
        var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

        coordinates.top = 'auto';
        coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top);
      }

      menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);
      if (menuIsOffScreen.left) {
        coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
        delete coordinates.right;
      }
      if (menuIsOffScreen.top) {
        coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
        delete coordinates.bottom;
      }

      markerEl.parentNode.removeChild(markerEl);
      return coordinates;
    }
  }, {
    key: 'scrollIntoView',
    value: function scrollIntoView(elem) {
      var reasonableBuffer = 20,
          clientRect = void 0;
      var maxScrollDisplacement = 100;
      var e = this.menu;

      if (typeof e === 'undefined') return;

      while (clientRect === undefined || clientRect.height === 0) {
        clientRect = e.getBoundingClientRect();

        if (clientRect.height === 0) {
          e = e.childNodes[0];
          if (e === undefined || !e.getBoundingClientRect) {
            return;
          }
        }
      }

      var elemTop = clientRect.top;
      var elemBottom = elemTop + clientRect.height;

      if (elemTop < 0) {
        window.scrollTo(0, window.pageYOffset + clientRect.top - reasonableBuffer);
      } else if (elemBottom > window.innerHeight) {
        var maxY = window.pageYOffset + clientRect.top - reasonableBuffer;

        if (maxY - window.pageYOffset > maxScrollDisplacement) {
          maxY = window.pageYOffset + maxScrollDisplacement;
        }

        var targetY = window.pageYOffset - (window.innerHeight - elemBottom);

        if (targetY > maxY) {
          targetY = maxY;
        }

        window.scrollTo(0, targetY);
      }
    }
  }]);

  return TributeRange;
}();

exports.default = TributeRange;
module.exports = exports.default;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/mattyork/fuzzy
var TributeSearch = function () {
    function TributeSearch(tribute) {
        _classCallCheck(this, TributeSearch);

        this.tribute = tribute;
        this.tribute.search = this;
    }

    _createClass(TributeSearch, [{
        key: 'simpleFilter',
        value: function simpleFilter(pattern, array) {
            var _this = this;

            return array.filter(function (string) {
                return _this.test(pattern, string);
            });
        }
    }, {
        key: 'test',
        value: function test(pattern, string) {
            return this.match(pattern, string) !== null;
        }
    }, {
        key: 'match',
        value: function match(pattern, string, opts) {
            opts = opts || {};
            var patternIdx = 0,
                result = [],
                len = string.length,
                totalScore = 0,
                currScore = 0,
                pre = opts.pre || '',
                post = opts.post || '',
                compareString = opts.caseSensitive && string || string.toLowerCase(),
                ch = void 0,
                compareChar = void 0;

            pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

            var patternCache = this.traverse(compareString, pattern, 0, 0, []);
            if (!patternCache) {
                return null;
            }

            return {
                rendered: this.render(string, patternCache.cache, pre, post),
                score: patternCache.score
            };
        }
    }, {
        key: 'traverse',
        value: function traverse(string, pattern, stringIndex, patternIndex, patternCache) {
            // if the pattern search at end
            if (pattern.length === patternIndex) {

                // calculate score and copy the cache containing the indices where it's found
                return {
                    score: this.calculateScore(patternCache),
                    cache: patternCache.slice()
                };
            }

            // if string at end or remaining pattern > remaining string
            if (string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
                return undefined;
            }

            var c = pattern[patternIndex];
            var index = string.indexOf(c, stringIndex);
            var best = void 0,
                temp = void 0;

            while (index > -1) {
                patternCache.push(index);
                temp = this.traverse(string, pattern, index + 1, patternIndex + 1, patternCache);
                patternCache.pop();

                // if downstream traversal failed, return best answer so far
                if (!temp) {
                    return best;
                }

                if (!best || best.score < temp.score) {
                    best = temp;
                }

                index = string.indexOf(c, index + 1);
            }

            return best;
        }
    }, {
        key: 'calculateScore',
        value: function calculateScore(patternCache) {
            var score = 0;
            var temp = 1;

            patternCache.forEach(function (index, i) {
                if (i > 0) {
                    if (patternCache[i - 1] + 1 === index) {
                        temp += temp + 1;
                    } else {
                        temp = 1;
                    }
                }

                score += temp;
            });

            return score;
        }
    }, {
        key: 'render',
        value: function render(string, indices, pre, post) {
            var rendered = string.substring(0, indices[0]);

            indices.forEach(function (index, i) {
                rendered += pre + string[index] + post + string.substring(index + 1, indices[i + 1] ? indices[i + 1] : string.length);
            });

            return rendered;
        }
    }, {
        key: 'filter',
        value: function filter(pattern, arr, opts) {
            var _this2 = this;

            opts = opts || {};
            return arr.reduce(function (prev, element, idx, arr) {
                var str = element;

                if (opts.extract) {
                    str = opts.extract(element);

                    if (!str) {
                        // take care of undefineds / nulls / etc.
                        str = '';
                    }
                }

                var rendered = _this2.match(pattern, str, opts);

                if (rendered != null) {
                    prev[prev.length] = {
                        string: rendered.rendered,
                        score: rendered.score,
                        index: idx,
                        original: element
                    };
                }

                return prev;
            }, []).sort(function (a, b) {
                var compare = b.score - a.score;
                if (compare) return compare;
                return a.index - b.index;
            });
        }
    }]);

    return TributeSearch;
}();

exports.default = TributeSearch;
module.exports = exports.default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tribute = require("./Tribute");

var _Tribute2 = _interopRequireDefault(_Tribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Tribute2.default; /**
                                     * Tribute.js
                                     * Native ES6 JavaScript @mention Plugin
                                     **/

module.exports = exports.default;

},{"./Tribute":1}],7:[function(require,module,exports){
'use strict';

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

if (window && typeof window.CustomEvent !== "function") {
    var CustomEvent = function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    if (typeof window.Event !== 'undefined') {
        CustomEvent.prototype = window.Event.prototype;
    }

    window.CustomEvent = CustomEvent;
}

},{}]},{},[6])(6)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkFtQkc7QUFBQTs7QUFBQSwrQkFsQkMsTUFrQkQ7QUFBQSxZQWxCQyxNQWtCRCwrQkFsQlUsSUFrQlY7QUFBQSwrQkFqQkMsTUFpQkQ7QUFBQSxZQWpCQyxNQWlCRCwrQkFqQlUsSUFpQlY7QUFBQSxvQ0FoQkMsV0FnQkQ7QUFBQSxZQWhCQyxXQWdCRCxvQ0FoQmUsV0FnQmY7QUFBQSxnQ0FmQyxPQWVEO0FBQUEsWUFmQyxPQWVELGdDQWZXLEdBZVg7QUFBQSx5Q0FkQyxnQkFjRDtBQUFBLFlBZEMsZ0JBY0QseUNBZG9CLEtBY3BCO0FBQUEsdUNBYkMsY0FhRDtBQUFBLFlBYkMsY0FhRCx1Q0Fia0IsSUFhbEI7QUFBQSx5Q0FaQyxnQkFZRDtBQUFBLFlBWkMsZ0JBWUQseUNBWm9CLElBWXBCO0FBQUEsK0JBWEMsTUFXRDtBQUFBLFlBWEMsTUFXRCwrQkFYVSxLQVdWO0FBQUEsaUNBVkMsUUFVRDtBQUFBLFlBVkMsUUFVRCxpQ0FWWSxPQVVaO0FBQUEsbUNBVEMsVUFTRDtBQUFBLFlBVEMsVUFTRCxtQ0FUYyxJQVNkO0FBQUEsc0NBUkMsYUFRRDtBQUFBLFlBUkMsYUFRRCxzQ0FSaUIsSUFRakI7QUFBQSx3Q0FQQyxlQU9EO0FBQUEsWUFQQyxlQU9ELHdDQVBtQixJQU9uQjtBQUFBLHlDQU5DLG1CQU1EO0FBQUEsWUFOQyxtQkFNRCx5Q0FOdUIsSUFNdkI7QUFBQSxv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QUFIUyxTQUFuQjtBQUtBLFlBQUksTUFBTSxTQUFTLFdBQVQsQ0FBcUIsYUFBckIsQ0FBVjtBQUNBLFlBQUksZUFBSixDQUFvQixLQUFwQixFQUEyQixPQUFPLE9BQWxDLEVBQTJDLE9BQU8sVUFBbEQsRUFBOEQsT0FBTyxNQUFyRTtBQUNBLGVBQU8sR0FBUDtBQUNELEtBVnFEOztBQVl2RCxRQUFJLE9BQU8sT0FBTyxLQUFkLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3ZDLG9CQUFZLFNBQVosR0FBd0IsT0FBTyxLQUFQLENBQWEsU0FBckM7QUFDRDs7QUFFQSxXQUFPLFdBQVAsR0FBcUIsV0FBckI7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBUcmlidXRlVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBUcmlidXRlRXZlbnRzIGZyb20gXCIuL1RyaWJ1dGVFdmVudHNcIjtcbmltcG9ydCBUcmlidXRlTWVudUV2ZW50cyBmcm9tIFwiLi9UcmlidXRlTWVudUV2ZW50c1wiO1xuaW1wb3J0IFRyaWJ1dGVSYW5nZSBmcm9tIFwiLi9UcmlidXRlUmFuZ2VcIjtcbmltcG9ydCBUcmlidXRlU2VhcmNoIGZyb20gXCIuL1RyaWJ1dGVTZWFyY2hcIjtcblxuY2xhc3MgVHJpYnV0ZSB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICB2YWx1ZXMgPSBudWxsLFxuICAgICAgICBpZnJhbWUgPSBudWxsLFxuICAgICAgICBzZWxlY3RDbGFzcyA9ICdoaWdobGlnaHQnLFxuICAgICAgICB0cmlnZ2VyID0gJ0AnLFxuICAgICAgICBhdXRvY29tcGxldGVNb2RlID0gZmFsc2UsXG4gICAgICAgIHNlbGVjdFRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIGxvb2t1cCA9ICdrZXknLFxuICAgICAgICBmaWxsQXR0ciA9ICd2YWx1ZScsXG4gICAgICAgIGNvbGxlY3Rpb24gPSBudWxsLFxuICAgICAgICBtZW51Q29udGFpbmVyID0gbnVsbCxcbiAgICAgICAgbm9NYXRjaFRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZSA9IHRydWUsXG4gICAgICAgIGFsbG93U3BhY2VzID0gZmFsc2UsXG4gICAgICAgIHJlcGxhY2VUZXh0U3VmZml4ID0gbnVsbCxcbiAgICAgICAgcG9zaXRpb25NZW51ID0gdHJ1ZSxcbiAgICAgICAgc3BhY2VTZWxlY3RzTWF0Y2ggPSBmYWxzZSxcbiAgICAgICAgc2VhcmNoT3B0cyA9IHt9LFxuICAgIH0pIHtcbiAgICAgICAgdGhpcy5hdXRvY29tcGxldGVNb2RlID0gYXV0b2NvbXBsZXRlTW9kZVxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgdGhpcy5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lciA9IG1lbnVDb250YWluZXJcbiAgICAgICAgdGhpcy5hbGxvd1NwYWNlcyA9IGFsbG93U3BhY2VzXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRTdWZmaXggPSByZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICB0aGlzLnBvc2l0aW9uTWVudSA9IHBvc2l0aW9uTWVudVxuICAgICAgICB0aGlzLmhhc1RyYWlsaW5nU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGFjZVNlbGVjdHNNYXRjaCA9IHNwYWNlU2VsZWN0c01hdGNoO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZU1vZGUpIHtcbiAgICAgICAgICAgIHRyaWdnZXIgPSAnJ1xuICAgICAgICAgICAgYWxsb3dTcGFjZXMgPSBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gW3tcbiAgICAgICAgICAgICAgICAvLyBzeW1ib2wgdGhhdCBzdGFydHMgdGhlIGxvb2t1cFxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IHRyaWdnZXIsXG5cbiAgICAgICAgICAgICAgICAvLyBpcyBpdCB3cmFwcGVkIGluIGFuIGlmcmFtZVxuICAgICAgICAgICAgICAgIGlmcmFtZTogaWZyYW1lLFxuXG4gICAgICAgICAgICAgICAgLy8gY2xhc3MgYXBwbGllZCB0byBzZWxlY3RlZCBpdGVtXG4gICAgICAgICAgICAgICAgc2VsZWN0Q2xhc3M6IHNlbGVjdENsYXNzLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIG9uIHNlbGVjdCB0aGF0IHJldHVucyB0aGUgY29udGVudCB0byBpbnNlcnRcbiAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKHNlbGVjdFRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdFNlbGVjdFRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHRoYXQgcmV0dXJucyBjb250ZW50IGZvciBhbiBpdGVtXG4gICAgICAgICAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZTogKG1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIG1lbnUgaXMgZW1wdHksIGRpc2FibGVzIGhpZGluZyBvZiBtZW51LlxuICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub01hdGNoVGVtcGxhdGUgfHwgZnVuY3Rpb24gKCkge3JldHVybiAnJ30uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0pKG5vTWF0Y2hUZW1wbGF0ZSksXG5cbiAgICAgICAgICAgICAgICAvLyBjb2x1bW4gdG8gc2VhcmNoIGFnYWluc3QgaW4gdGhlIG9iamVjdFxuICAgICAgICAgICAgICAgIGxvb2t1cDogbG9va3VwLFxuXG4gICAgICAgICAgICAgICAgLy8gY29sdW1uIHRoYXQgY29udGFpbnMgdGhlIGNvbnRlbnQgdG8gaW5zZXJ0IGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICBmaWxsQXR0cjogZmlsbEF0dHIsXG5cbiAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiBvYmplY3RzIG9yIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGFuIGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHZhbHVlcyxcblxuICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2U6IHJlcXVpcmVMZWFkaW5nU3BhY2UsXG5cbiAgICAgICAgICAgICAgICBzZWFyY2hPcHRzOiBzZWFyY2hPcHRzXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZU1vZGUpXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdUcmlidXRlIGluIGF1dG9jb21wbGV0ZSBtb2RlIGRvZXMgbm90IHdvcmsgZm9yIGNvbGxlY3Rpb25zJylcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24ubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6IGl0ZW0udHJpZ2dlciB8fCB0cmlnZ2VyLFxuICAgICAgICAgICAgICAgICAgICBpZnJhbWU6IGl0ZW0uaWZyYW1lIHx8IGlmcmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q2xhc3M6IGl0ZW0uc2VsZWN0Q2xhc3MgfHwgc2VsZWN0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFRlbXBsYXRlOiAoaXRlbS5zZWxlY3RUZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRTZWxlY3RUZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZTogKGl0ZW0ubWVudUl0ZW1UZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBtZW51IGlzIGVtcHR5LCBkaXNhYmxlcyBoaWRpbmcgb2YgbWVudS5cbiAgICAgICAgICAgICAgICAgICAgbm9NYXRjaFRlbXBsYXRlOiAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pKG5vTWF0Y2hUZW1wbGF0ZSksXG4gICAgICAgICAgICAgICAgICAgIGxvb2t1cDogaXRlbS5sb29rdXAgfHwgbG9va3VwLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQXR0cjogaXRlbS5maWxsQXR0ciB8fCBmaWxsQXR0cixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBpdGVtLnZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZTogaXRlbS5yZXF1aXJlTGVhZGluZ1NwYWNlLFxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hPcHRzOiBpdGVtLnNlYXJjaE9wdHMgfHwgc2VhcmNoT3B0c1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBObyBjb2xsZWN0aW9uIHNwZWNpZmllZC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgbmV3IFRyaWJ1dGVSYW5nZSh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZUV2ZW50cyh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZU1lbnVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVTZWFyY2godGhpcylcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFNlbGVjdFRlbXBsYXRlKGl0ZW0pIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHRoaXMucmFuZ2UuaXNDb250ZW50RWRpdGFibGUodGhpcy5jdXJyZW50LmVsZW1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cInRyaWJ1dGUtbWVudGlvblwiPicgKyAodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlciArIGl0ZW0ub3JpZ2luYWxbdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uZmlsbEF0dHJdKSArICc8L3NwYW4+JztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdE1lbnVJdGVtVGVtcGxhdGUobWF0Y2hJdGVtKSB7XG4gICAgICAgIHJldHVybiBtYXRjaEl0ZW0uc3RyaW5nXG4gICAgfVxuXG4gICAgc3RhdGljIGlucHV0VHlwZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ1RFWFRBUkVBJywgJ0lOUFVUJ11cbiAgICB9XG5cbiAgICB0cmlnZ2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5tYXAoY29uZmlnID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcudHJpZ2dlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF0dGFjaChlbCkge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBNdXN0IHBhc3MgaW4gYSBET00gbm9kZSBvciBOb2RlTGlzdC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBqUXVlcnkgY29sbGVjdGlvblxuICAgICAgICBpZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgICAgICAgIGVsID0gZWwuZ2V0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGVsIGFuIEFycmF5L0FycmF5LWxpa2Ugb2JqZWN0P1xuICAgICAgICBpZiAoZWwuY29uc3RydWN0b3IgPT09IE5vZGVMaXN0IHx8IGVsLmNvbnN0cnVjdG9yID09PSBIVE1MQ29sbGVjdGlvbiB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBlbC5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdHRhY2goZWxbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRhY2goZWwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYXR0YWNoKGVsKSB7XG4gICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdHJpYnV0ZScpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RyaWJ1dGUgd2FzIGFscmVhZHkgYm91bmQgdG8gJyArIGVsLm5vZGVOYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbnN1cmVFZGl0YWJsZShlbClcbiAgICAgICAgdGhpcy5ldmVudHMuYmluZChlbClcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnLCB0cnVlKVxuICAgIH1cblxuICAgIGVuc3VyZUVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKFRyaWJ1dGUuaW5wdXRUeXBlcygpLmluZGV4T2YoZWxlbWVudC5ub2RlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gQ2Fubm90IGJpbmQgdG8gJyArIGVsZW1lbnQubm9kZU5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVNZW51KCkge1xuICAgICAgICBsZXQgd3JhcHBlciA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIHVsID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICd0cmlidXRlLWNvbnRhaW5lcidcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh1bClcblxuICAgICAgICBpZiAodGhpcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51Q29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcilcbiAgICB9XG5cbiAgICBzaG93TWVudUZvcihlbGVtZW50LCBzY3JvbGxUbykge1xuICAgICAgICAvLyBPbmx5IHByb2NlZWQgaWYgbWVudSBpc24ndCBhbHJlYWR5IHNob3duIGZvciB0aGUgY3VycmVudCBlbGVtZW50ICYgbWVudGlvblRleHRcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5jdXJyZW50LmVsZW1lbnQgPT09IGVsZW1lbnQgJiYgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0ID09PSB0aGlzLmN1cnJlbnRNZW50aW9uVGV4dFNuYXBzaG90KSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50TWVudGlvblRleHRTbmFwc2hvdCA9IHRoaXMuY3VycmVudC5tZW50aW9uVGV4dFxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbWVudSBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgICBpZiAoIXRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5jcmVhdGVNZW51KClcbiAgICAgICAgICAgIGVsZW1lbnQudHJpYnV0ZU1lbnUgPSB0aGlzLm1lbnVcbiAgICAgICAgICAgIHRoaXMubWVudUV2ZW50cy5iaW5kKHRoaXMubWVudSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuXG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQubWVudGlvblRleHQgPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvY2Vzc1ZhbHVlcyA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgIC8vIFRyaWJ1dGUgbWF5IG5vdCBiZSBhY3RpdmUgYW55IG1vcmUgYnkgdGhlIHRpbWUgdGhlIHZhbHVlIGNhbGxiYWNrIHJldHVybnNcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnNlYXJjaC5maWx0ZXIodGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0LCB2YWx1ZXMsIHtcbiAgICAgICAgICAgICAgICBwcmU6IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlYXJjaE9wdHMucHJlIHx8ICc8c3Bhbj4nLFxuICAgICAgICAgICAgICAgIHBvc3Q6IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlYXJjaE9wdHMucG9zdCB8fCAnPC9zcGFuPicsXG4gICAgICAgICAgICAgICAgZXh0cmFjdDogKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cF1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwKGVsLCB0aGlzLmN1cnJlbnQubWVudGlvblRleHQpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbG9va3VwIGF0dHJpYnV0ZSwgbG9va3VwIG11c3QgYmUgc3RyaW5nIG9yIGZ1bmN0aW9uLicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuZmlsdGVyZWRJdGVtcyA9IGl0ZW1zXG5cblxuICAgICAgICAgICAgbGV0IHVsID0gdGhpcy5tZW51LnF1ZXJ5U2VsZWN0b3IoJ3VsJylcblxuICAgICAgICAgICAgdGhpcy5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKVxuXG4gICAgICAgICAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBub01hdGNoRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RyaWJ1dGUtbm8tbWF0Y2gnLCB7IGRldGFpbDogdGhpcy5tZW51IH0pXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LmVsZW1lbnQuZGlzcGF0Y2hFdmVudChub01hdGNoRXZlbnQpXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5ub01hdGNoVGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdWwuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubm9NYXRjaFRlbXBsYXRlKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdWwuaW5uZXJIVE1MID0gJydcblxuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbGkgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KVxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGxpID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKVxuICAgICAgICAgICAgICAgICAgaWYgKGUubW92ZW1lbnRYICE9PSAwICYmIGUubW92ZW1lbnRZICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNldEFjdGl2ZUxpKGluZGV4KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudVNlbGVjdGVkID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc05hbWUgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5zZWxlY3RDbGFzc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaS5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5tZW51SXRlbVRlbXBsYXRlKGl0ZW0pXG4gICAgICAgICAgICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcyh0aGlzLmN1cnJlbnQubWVudGlvblRleHQsIHByb2Nlc3NWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzVmFsdWVzKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dNZW51Rm9yQ29sbGVjdGlvbihlbGVtZW50LCBjb2xsZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEF0RW5kKGVsZW1lbnQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltjb2xsZWN0aW9uSW5kZXggfHwgMF1cbiAgICAgICAgdGhpcy5jdXJyZW50LmV4dGVybmFsVHJpZ2dlciA9IHRydWVcbiAgICAgICAgdGhpcy5jdXJyZW50LmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuaXNDb250ZW50RWRpdGFibGUpXG4gICAgICAgICAgICB0aGlzLmluc2VydFRleHRBdEN1cnNvcih0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmluc2VydEF0Q2FyZXQoZWxlbWVudCwgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlcilcblxuICAgICAgICB0aGlzLnNob3dNZW51Rm9yKGVsZW1lbnQpXG4gICAgfVxuXG4gICAgLy8gVE9ETzogbWFrZSBzdXJlIHRoaXMgd29ya3MgZm9yIGlucHV0cy90ZXh0YXJlYXNcbiAgICBwbGFjZUNhcmV0QXRFbmQoZWwpIHtcbiAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuZ2V0U2VsZWN0aW9uICE9IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlUmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbCk7XG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIHRleHRSYW5nZSA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2UubW92ZVRvRWxlbWVudFRleHQoZWwpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvciBjb250ZW50ZWRpdGFibGVcbiAgICBpbnNlcnRUZXh0QXRDdXJzb3IodGV4dCkge1xuICAgICAgICB2YXIgc2VsLCByYW5nZSwgaHRtbDtcbiAgICAgICAgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xuICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpO1xuICAgICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZSh0ZXh0Tm9kZSk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0ZXh0Tm9kZSlcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgfVxuXG4gICAgLy8gZm9yIHJlZ3VsYXIgaW5wdXRzXG4gICAgaW5zZXJ0QXRDYXJldCh0ZXh0YXJlYSwgdGV4dCkge1xuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gdGV4dGFyZWEuc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgY2FyZXRQb3MgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICB2YXIgZnJvbnQgPSAodGV4dGFyZWEudmFsdWUpLnN1YnN0cmluZygwLCBjYXJldFBvcyk7XG4gICAgICAgIHZhciBiYWNrID0gKHRleHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcodGV4dGFyZWEuc2VsZWN0aW9uRW5kLCB0ZXh0YXJlYS52YWx1ZS5sZW5ndGgpO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGZyb250ICsgdGV4dCArIGJhY2s7XG4gICAgICAgIGNhcmV0UG9zID0gY2FyZXRQb3MgKyB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBjYXJldFBvcztcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gY2FyZXRQb3M7XG4gICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgIHRleHRhcmVhLnNjcm9sbFRvcCA9IHNjcm9sbFBvcztcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZTsnXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEl0ZW1BdEluZGV4KGluZGV4LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgICAgIGluZGV4ID0gcGFyc2VJbnQoaW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInIHx8IGlzTmFOKGluZGV4KSkgcmV0dXJuXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5jdXJyZW50LmZpbHRlcmVkSXRlbXNbaW5kZXhdXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0VGVtcGxhdGUoaXRlbSlcbiAgICAgICAgaWYgKGNvbnRlbnQgIT09IG51bGwpIHRoaXMucmVwbGFjZVRleHQoY29udGVudCwgb3JpZ2luYWxFdmVudCwgaXRlbSlcbiAgICB9XG5cbiAgICByZXBsYWNlVGV4dChjb250ZW50LCBvcmlnaW5hbEV2ZW50LCBpdGVtKSB7XG4gICAgICAgIHRoaXMucmFuZ2UucmVwbGFjZVRyaWdnZXJUZXh0KGNvbnRlbnQsIHRydWUsIHRydWUsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pXG4gICAgfVxuXG4gICAgX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uLnZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gYXBwZW5kIHRvIHZhbHVlcywgYXMgaXQgaXMgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9IGVsc2UgaWYgKCFyZXBsYWNlKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IGNvbGxlY3Rpb24udmFsdWVzLmNvbmNhdChuZXdWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IG5ld1ZhbHVlc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kKGNvbGxlY3Rpb25JbmRleCwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHBhcnNlSW50KGNvbGxlY3Rpb25JbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcigncGxlYXNlIHByb3ZpZGUgYW4gaW5kZXggZm9yIHRoZSBjb2xsZWN0aW9uIHRvIHVwZGF0ZS4nKVxuXG4gICAgICAgIGxldCBjb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uW2luZGV4XVxuXG4gICAgICAgIHRoaXMuX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpXG4gICAgfVxuXG4gICAgYXBwZW5kQ3VycmVudChuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZCh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RpdmUgc3RhdGUuIFBsZWFzZSB1c2UgYXBwZW5kIGluc3RlYWQgYW5kIHBhc3MgYW4gaW5kZXguJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRldGFjaChlbCkge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBNdXN0IHBhc3MgaW4gYSBET00gbm9kZSBvciBOb2RlTGlzdC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBqUXVlcnkgY29sbGVjdGlvblxuICAgICAgICBpZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgICAgICAgIGVsID0gZWwuZ2V0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGVsIGFuIEFycmF5L0FycmF5LWxpa2Ugb2JqZWN0P1xuICAgICAgICBpZiAoZWwuY29uc3RydWN0b3IgPT09IE5vZGVMaXN0IHx8IGVsLmNvbnN0cnVjdG9yID09PSBIVE1MQ29sbGVjdGlvbiB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBlbC5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXRhY2goZWxbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kZXRhY2goZWwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZGV0YWNoKGVsKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnVuYmluZChlbClcbiAgICAgICAgaWYgKGVsLnRyaWJ1dGVNZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVFdmVudHMudW5iaW5kKGVsLnRyaWJ1dGVNZW51KVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJpYnV0ZScpXG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIGlmIChlbC50cmlidXRlTWVudSkge1xuICAgICAgICAgICAgICAgIGVsLnRyaWJ1dGVNZW51LnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlO1xuIiwiY2xhc3MgVHJpYnV0ZUV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5ldmVudHMgPSB0aGlzXG4gICAgfVxuXG4gICAgc3RhdGljIGtleXMoKSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAga2V5OiA5LFxuICAgICAgICAgICAgdmFsdWU6ICdUQUInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogOCxcbiAgICAgICAgICAgIHZhbHVlOiAnREVMRVRFJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDEzLFxuICAgICAgICAgICAgdmFsdWU6ICdFTlRFUidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAyNyxcbiAgICAgICAgICAgIHZhbHVlOiAnRVNDQVBFJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDMyLFxuICAgICAgICAgICAgdmFsdWU6ICdTUEFDRSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAzOCxcbiAgICAgICAgICAgIHZhbHVlOiAnVVAnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogNDAsXG4gICAgICAgICAgICB2YWx1ZTogJ0RPV04nXG4gICAgICAgIH1dXG4gICAgfVxuXG4gICAgYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuYm91bmRLZXlkb3duID0gdGhpcy5rZXlkb3duLmJpbmQoZWxlbWVudCwgdGhpcyk7XG4gICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCA9IHRoaXMua2V5dXAuYmluZChlbGVtZW50LCB0aGlzKTtcbiAgICAgICAgZWxlbWVudC5ib3VuZElucHV0ID0gdGhpcy5pbnB1dC5iaW5kKGVsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleXVwLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kSW5wdXQsIGZhbHNlKVxuICAgIH1cblxuICAgIHVuYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleXVwLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kSW5wdXQsIGZhbHNlKVxuXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50LmJvdW5kS2V5ZG93blxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZEtleXVwXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50LmJvdW5kSW5wdXRcbiAgICB9XG5cbiAgICBrZXlkb3duKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2Uuc2hvdWxkRGVhY3RpdmF0ZShldmVudCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXNcbiAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgaWYgKG8ua2V5ID09PSBldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW28udmFsdWUudG9Mb3dlckNhc2UoKV0oZXZlbnQsIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5wdXQoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGluc3RhbmNlLmlucHV0RXZlbnQgPSB0cnVlXG4gICAgICAgIGluc3RhbmNlLmtleXVwLmNhbGwodGhpcywgaW5zdGFuY2UsIGV2ZW50KVxuICAgIH1cblxuICAgIGNsaWNrKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcbiAgICAgICAgaWYgKHRyaWJ1dGUubWVudSAmJiB0cmlidXRlLm1lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbGV0IGxpID0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdsaScpIHtcbiAgICAgICAgICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgICAgICAgICAgICBpZiAoIWxpIHx8IGxpID09PSB0cmlidXRlLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZmluZCB0aGUgPGxpPiBjb250YWluZXIgZm9yIHRoZSBjbGljaycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleChsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgZXZlbnQpXG4gICAgICAgICAgICB0cmlidXRlLmhpZGVNZW51KClcblxuICAgICAgICAvLyBUT0RPOiBzaG91bGQgZmlyZSB3aXRoIGV4dGVybmFsVHJpZ2dlciBhbmQgdGFyZ2V0IGlzIG91dHNpZGUgb2YgbWVudVxuICAgICAgICB9IGVsc2UgaWYgKHRyaWJ1dGUuY3VycmVudC5lbGVtZW50ICYmICF0cmlidXRlLmN1cnJlbnQuZXh0ZXJuYWxUcmlnZ2VyKSB7XG4gICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuZXh0ZXJuYWxUcmlnZ2VyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdHJpYnV0ZS5oaWRlTWVudSgpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAga2V5dXAoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5pbnB1dEV2ZW50KSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS51cGRhdGVTZWxlY3Rpb24odGhpcylcblxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHJldHVyblxuXG4gICAgICAgIGlmICghaW5zdGFuY2UudHJpYnV0ZS5hbGxvd1NwYWNlcyAmJiBpbnN0YW5jZS50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSA9IGZhbHNlO1xuICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW1wic3BhY2VcIl0oZXZlbnQsIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS50cmlidXRlLmF1dG9jb21wbGV0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKS50cmlnZ2VyQ2hhcihldmVudCwgdGhpcywgJycpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBrZXlDb2RlID0gaW5zdGFuY2UuZ2V0S2V5Q29kZShpbnN0YW5jZSwgdGhpcywgZXZlbnQpXG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKGtleUNvZGUpIHx8ICFrZXlDb2RlKSByZXR1cm5cbiAgICBcbiAgICAgICAgICAgICAgICBsZXQgdHJpZ2dlciA9IGluc3RhbmNlLnRyaWJ1dGUudHJpZ2dlcnMoKS5maW5kKHRyaWdnZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJpZ2dlci5jaGFyQ29kZUF0KDApID09PSBrZXlDb2RlXG4gICAgICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRyaWdnZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpLnRyaWdnZXJDaGFyKGV2ZW50LCB0aGlzLCB0cmlnZ2VyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoaW5zdGFuY2UudHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgfHwgaW5zdGFuY2UudHJpYnV0ZS5hdXRvY29tcGxldGVNb2RlKVxuICAgICAgICAgICAgJiYgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID09PSBmYWxzZVxuICAgICAgICAgICAgfHwgaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSAmJiBldmVudC5rZXlDb2RlID09PSA4KSB7XG4gICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLCB0cnVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdWxkRGVhY3RpdmF0ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbGV0IGV2ZW50S2V5UHJlc3NlZCA9IGZhbHNlXG4gICAgICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBvLmtleSkgZXZlbnRLZXlQcmVzc2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuICFldmVudEtleVByZXNzZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGdldEtleUNvZGUoaW5zdGFuY2UsIGVsLCBldmVudCkge1xuICAgICAgICBsZXQgY2hhclxuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcbiAgICAgICAgbGV0IGluZm8gPSB0cmlidXRlLnJhbmdlLmdldFRyaWdnZXJJbmZvKGZhbHNlLCB0cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UsIHRydWUsIHRyaWJ1dGUuYWxsb3dTcGFjZXMsIHRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSlcblxuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIGluZm8ubWVudGlvblRyaWdnZXJDaGFyLmNoYXJDb2RlQXQoMClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0aW9uKGVsKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQgPSBlbFxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMudHJpYnV0ZS5yYW5nZS5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgdGhpcy50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UsIHRydWUsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcywgdGhpcy50cmlidXRlLmF1dG9jb21wbGV0ZU1vZGUpXG5cbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LnNlbGVjdGVkUGF0aCA9IGluZm8ubWVudGlvblNlbGVjdGVkUGF0aFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQubWVudGlvblRleHQgPSBpbmZvLm1lbnRpb25UZXh0XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5zZWxlY3RlZE9mZnNldCA9IGluZm8ubWVudGlvblNlbGVjdGVkT2Zmc2V0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsYmFja3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmlnZ2VyQ2hhcjogKGUsIGVsLCB0cmlnZ2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHRyaWJ1dGUgPSB0aGlzLnRyaWJ1dGVcbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQudHJpZ2dlciA9IHRyaWdnZXJcblxuICAgICAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uSXRlbSA9IHRyaWJ1dGUuY29sbGVjdGlvbi5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS50cmlnZ2VyID09PSB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uID0gY29sbGVjdGlvbkl0ZW1cbiAgICAgICAgICAgICAgICBpZiAodHJpYnV0ZS5pbnB1dEV2ZW50KSB0cmlidXRlLnNob3dNZW51Rm9yKGVsLCB0cnVlKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudGVyOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjaG9vc2Ugc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleCh0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLCBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIGZpcnN0IG1hdGNoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGFjZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLnNwYWNlU2VsZWN0c01hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrcygpLmVudGVyKGUsIGVsKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBuYXZpZ2F0ZSB1cCB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWRcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiBzZWxlY3RlZCAmJiBzZWxlY3RlZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQtLVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gY291bnQgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wID0gdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgZG93biB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZmlsdGVyZWRJdGVtcy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQrK1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zY3JvbGxUb3AgPSAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVsZXRlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlICYmIHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2hvd01lbnVGb3IoZWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlTGkoaW5kZXgpIHtcbiAgICAgICAgbGV0IGxpcyA9IHRoaXMudHJpYnV0ZS5tZW51LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksXG4gICAgICAgICAgICBsZW5ndGggPSBsaXMubGVuZ3RoID4+PiAwXG5cbiAgICAgICAgaWYgKGluZGV4KSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gcGFyc2VJbnQoaW5kZXgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaSA9IGxpc1tpXVxuICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3MpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxpQ2xpZW50UmVjdCA9IGxpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIGxldCBtZW51Q2xpZW50UmVjdCA9IHRoaXMudHJpYnV0ZS5tZW51LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxpQ2xpZW50UmVjdC5ib3R0b20gPiBtZW51Q2xpZW50UmVjdC5ib3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbERpc3RhbmNlID0gbGlDbGllbnRSZWN0LmJvdHRvbSAtIG1lbnVDbGllbnRSZWN0LmJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wICs9IHNjcm9sbERpc3RhbmNlXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsaUNsaWVudFJlY3QudG9wIDwgbWVudUNsaWVudFJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxEaXN0YW5jZSA9IG1lbnVDbGllbnRSZWN0LnRvcCAtIGxpQ2xpZW50UmVjdC50b3A7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCAtPSBzY3JvbGxEaXN0YW5jZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RnVsbEhlaWdodChlbGVtLCBpbmNsdWRlTWFyZ2luKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblxuICAgICAgaWYgKGluY2x1ZGVNYXJnaW4pIHtcbiAgICAgICAgbGV0IHN0eWxlID0gZWxlbS5jdXJyZW50U3R5bGUgfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSlcbiAgICAgICAgcmV0dXJuIGhlaWdodCArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luQm90dG9tKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVpZ2h0XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVFdmVudHM7XG4iLCJjbGFzcyBUcmlidXRlTWVudUV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51RXZlbnRzID0gdGhpc1xuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLnRyaWJ1dGUubWVudVxuICAgIH1cblxuICAgIGJpbmQobWVudSkge1xuICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50ID0gdGhpcy50cmlidXRlLmV2ZW50cy5jbGljay5iaW5kKG51bGwsIHRoaXMpXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50ID0gdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDAsIGZhbHNlKVxuICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZUV2ZW50ID0gdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLnBvc2l0aW9uTWVudUF0Q2FyZXQodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwLCBmYWxzZSlcblxuICAgICAgICAvLyBmaXhlcyBJRTExIGlzc3VlcyB3aXRoIG1vdXNlZG93blxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJyxcbiAgICAgICAgICAgIHRoaXMubWVudUNsaWNrRXZlbnQsIGZhbHNlKVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLFxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCwgZmFsc2UpXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLndpbmRvd1Jlc2l6ZUV2ZW50KVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudCwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHVuYmluZChtZW51KSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLmdldERvY3VtZW50KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMud2luZG93UmVzaXplRXZlbnQpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50LCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICB2YXIgdGltZW91dFxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICAgICAgICAgIHZhciBsYXRlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dFxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdClcbiAgICAgICAgICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZU1lbnVFdmVudHM7XG4iLCIvLyBUaGFua3MgdG8gaHR0cHM6Ly9naXRodWIuY29tL2plZmYtY29sbGlucy9tZW50LmlvXG5jbGFzcyBUcmlidXRlUmFuZ2Uge1xuICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgIHRoaXMudHJpYnV0ZS5yYW5nZSA9IHRoaXNcbiAgfVxuXG4gIGdldERvY3VtZW50KCkge1xuICAgIGxldCBpZnJhbWVcbiAgICBpZiAodGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbikge1xuICAgICAgaWZyYW1lID0gdGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbi5pZnJhbWVcbiAgICB9XG5cbiAgICBpZiAoIWlmcmFtZSkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50XG4gICAgfVxuXG4gICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50XG4gIH1cblxuICBwb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgIGNvb3JkaW5hdGVzXG5cbiAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIHRoaXMudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMsIHRoaXMudHJpYnV0ZS5hdXRvY29tcGxldGVNb2RlKVxuXG4gICAgaWYgKHR5cGVvZiBpbmZvICE9PSAndW5kZWZpbmVkJykge1xuXG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy50cmlidXRlLnBvc2l0aW9uTWVudSA9PT0gJ2Jvb2xlYW4nICYmICF0aGlzLnRyaWJ1dGUucG9zaXRpb25NZW51KSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgZGlzcGxheTogYmxvY2s7YFxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLmdldFRleHRBcmVhT3JJbnB1dFVuZGVybGluZVBvc2l0aW9uKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGluZm8ubWVudGlvblBvc2l0aW9uKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKGluZm8ubWVudGlvblBvc2l0aW9uKVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnRyaWJ1dGUucG9zaXRpb25NZW51ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCB7cG9zaXRpb25NZW51fSA9IHRoaXMudHJpYnV0ZTtcbiAgICAgICAgY29vcmRpbmF0ZXMubGVmdCA9IGNvb3JkaW5hdGVzLmxlZnQgKyAocG9zaXRpb25NZW51LmZvbnRTaXplIHx8IDEyKSAtIHBvc2l0aW9uTWVudS53aWR0aCAvIDI7XG4gICAgICB9XG4gICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogJHtjb29yZGluYXRlcy50b3B9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJHtjb29yZGluYXRlcy5sZWZ0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAke2Nvb3JkaW5hdGVzLnJpZ2h0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJHtjb29yZGluYXRlcy5ib3R0b219cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7YFxuXG4gICAgICBpZiAoY29vcmRpbmF0ZXMubGVmdCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmxlZnQgPSAnYXV0bydcbiAgICAgIH1cblxuICAgICAgaWYgKGNvb3JkaW5hdGVzLnRvcCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLnRvcCA9ICdhdXRvJ1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG8pIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKVxuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHtcbiAgICAgICAgICB3aWR0aDogdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRIZWlnaHRcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuXG4gICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW5Ib3Jpem9udGFsbHkgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IG1lbnVEaW1lbnNpb25zLndpZHRoICYmIChtZW51SXNPZmZTY3JlZW4ubGVmdCB8fCBtZW51SXNPZmZTY3JlZW4ucmlnaHQpXG4gICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW5WZXJ0aWNhbGx5ID0gd2luZG93LmlubmVySGVpZ2h0ID4gbWVudURpbWVuc2lvbnMuaGVpZ2h0ICYmIChtZW51SXNPZmZTY3JlZW4udG9wIHx8IG1lbnVJc09mZlNjcmVlbi5ib3R0b20pXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW5Ib3Jpem9udGFsbHkgfHwgbWVudUlzT2ZmU2NyZWVuVmVydGljYWxseSkge1xuICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZSdcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uTWVudUF0Q2FyZXQoc2Nyb2xsVG8pXG4gICAgICAgIH1cbiAgICAgIH0sIDApXG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEVsZW1lbnQodGFyZ2V0RWxlbWVudCwgcGF0aCwgb2Zmc2V0KSB7XG4gICAgbGV0IHJhbmdlXG4gICAgbGV0IGVsZW0gPSB0YXJnZXRFbGVtZW50XG5cbiAgICBpZiAocGF0aCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsZW0gPSBlbGVtLmNoaWxkTm9kZXNbcGF0aFtpXV1cbiAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChlbGVtLmxlbmd0aCA8IG9mZnNldCkge1xuICAgICAgICAgIG9mZnNldCAtPSBlbGVtLmxlbmd0aFxuICAgICAgICAgIGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW0uY2hpbGROb2Rlcy5sZW5ndGggPT09IDAgJiYgIWVsZW0ubGVuZ3RoKSB7XG4gICAgICAgICAgZWxlbSA9IGVsZW0ucHJldmlvdXNTaWJsaW5nXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcblxuICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICByYW5nZS5zZXRTdGFydChlbGVtLCBvZmZzZXQpXG4gICAgcmFuZ2Uuc2V0RW5kKGVsZW0sIG9mZnNldClcbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuXG4gICAgdHJ5IHtcbiAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgfVxuXG4gICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgIHRhcmdldEVsZW1lbnQuZm9jdXMoKVxuICB9XG5cbiAgcmVwbGFjZVRyaWdnZXJUZXh0KHRleHQsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIGhhc1RyYWlsaW5nU3BhY2UsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pIHtcbiAgICBsZXQgY29udGV4dCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50XG4gICAgbGV0IGluZm8gPSB0aGlzLmdldFRyaWdnZXJJbmZvKHRydWUsIGhhc1RyYWlsaW5nU3BhY2UsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcywgdGhpcy50cmlidXRlLmF1dG9jb21wbGV0ZU1vZGUpXG5cbiAgICAvLyBDcmVhdGUgdGhlIGV2ZW50XG4gICAgbGV0IHJlcGxhY2VFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1yZXBsYWNlZCcsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICBldmVudDogb3JpZ2luYWxFdmVudFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoaW5mbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICBsZXQgbXlGaWVsZCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnRcbiAgICAgICAgbGV0IHRleHRTdWZmaXggPSB0eXBlb2YgdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4ID09ICdzdHJpbmcnXG4gICAgICAgICAgPyB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgICA6ICcgJ1xuICAgICAgICB0ZXh0ICs9IHRleHRTdWZmaXhcbiAgICAgICAgbGV0IHN0YXJ0UG9zID0gaW5mby5tZW50aW9uUG9zaXRpb25cbiAgICAgICAgbGV0IGVuZFBvcyA9IGluZm8ubWVudGlvblBvc2l0aW9uICsgaW5mby5tZW50aW9uVGV4dC5sZW5ndGggKyB0ZXh0U3VmZml4Lmxlbmd0aFxuICAgICAgICBteUZpZWxkLnZhbHVlID0gbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdGV4dCArXG4gICAgICAgICAgbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBteUZpZWxkLnZhbHVlLmxlbmd0aClcbiAgICAgICAgbXlGaWVsZC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0UG9zICsgdGV4dC5sZW5ndGhcbiAgICAgICAgbXlGaWVsZC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIHRleHQubGVuZ3RoXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhZGQgYSBzcGFjZSB0byB0aGUgZW5kIG9mIHRoZSBwYXN0ZWQgdGV4dFxuICAgICAgICBsZXQgdGV4dFN1ZmZpeCA9IHR5cGVvZiB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXggPT0gJ3N0cmluZydcbiAgICAgICAgICA/IHRoaXMudHJpYnV0ZS5yZXBsYWNlVGV4dFN1ZmZpeFxuICAgICAgICAgIDogJ1xceEEwJ1xuICAgICAgICB0ZXh0ICs9IHRleHRTdWZmaXhcbiAgICAgICAgdGhpcy5wYXN0ZUh0bWwodGV4dCwgaW5mby5tZW50aW9uUG9zaXRpb24sXG4gICAgICAgICAgaW5mby5tZW50aW9uUG9zaXRpb24gKyBpbmZvLm1lbnRpb25UZXh0Lmxlbmd0aCArICF0aGlzLnRyaWJ1dGUuYXV0b2NvbXBsZXRlTW9kZSlcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5lbGVtZW50LmRpc3BhdGNoRXZlbnQocmVwbGFjZUV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIHBhc3RlSHRtbChodG1sLCBzdGFydFBvcywgZW5kUG9zKSB7XG4gICAgbGV0IHJhbmdlLCBzZWxcbiAgICBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzdGFydFBvcylcbiAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIGVuZFBvcylcbiAgICByYW5nZS5kZWxldGVDb250ZW50cygpXG5cbiAgICBsZXQgZWwgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBlbC5pbm5lckhUTUwgPSBodG1sXG4gICAgbGV0IGZyYWcgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgbm9kZSwgbGFzdE5vZGVcbiAgICB3aGlsZSAoKG5vZGUgPSBlbC5maXJzdENoaWxkKSkge1xuICAgICAgbGFzdE5vZGUgPSBmcmFnLmFwcGVuZENoaWxkKG5vZGUpXG4gICAgfVxuICAgIHJhbmdlLmluc2VydE5vZGUoZnJhZylcblxuICAgIC8vIFByZXNlcnZlIHRoZSBzZWxlY3Rpb25cbiAgICBpZiAobGFzdE5vZGUpIHtcbiAgICAgIHJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpXG4gICAgICByYW5nZS5zZXRTdGFydEFmdGVyKGxhc3ROb2RlKVxuICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcbiAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgIH1cbiAgfVxuXG4gIGdldFdpbmRvd1NlbGVjdGlvbigpIHtcbiAgICBpZiAodGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lLmNvbnRlbnRXaW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICB9XG5cbiAgICByZXR1cm4gd2luZG93LmdldFNlbGVjdGlvbigpXG4gIH1cblxuICBnZXROb2RlUG9zaXRpb25JblBhcmVudChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldXG5cbiAgICAgIGlmIChub2RlID09PSBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29udGVudEVkaXRhYmxlU2VsZWN0ZWRQYXRoKGN0eCkge1xuICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgbGV0IHNlbGVjdGVkID0gc2VsLmFuY2hvck5vZGVcbiAgICBsZXQgcGF0aCA9IFtdXG4gICAgbGV0IG9mZnNldFxuXG4gICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgIGxldCBpXG4gICAgICBsZXQgY2UgPSBzZWxlY3RlZC5jb250ZW50RWRpdGFibGVcbiAgICAgIHdoaWxlIChzZWxlY3RlZCAhPT0gbnVsbCAmJiBjZSAhPT0gJ3RydWUnKSB7XG4gICAgICAgIGkgPSB0aGlzLmdldE5vZGVQb3NpdGlvbkluUGFyZW50KHNlbGVjdGVkKVxuICAgICAgICBwYXRoLnB1c2goaSlcbiAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5wYXJlbnROb2RlXG4gICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBhdGgucmV2ZXJzZSgpXG5cbiAgICAgIC8vIGdldFJhbmdlQXQgbWF5IG5vdCBleGlzdCwgbmVlZCBhbHRlcm5hdGl2ZVxuICAgICAgb2Zmc2V0ID0gc2VsLmdldFJhbmdlQXQoMCkuc3RhcnRPZmZzZXRcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkLFxuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICBvZmZzZXQ6IG9mZnNldFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKCkge1xuICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnQsXG4gICAgICB0ZXh0ID0gJydcblxuICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICBsZXQgdGV4dENvbXBvbmVudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQ7XG4gICAgICBpZiAodGV4dENvbXBvbmVudCkge1xuICAgICAgICBsZXQgc3RhcnRQb3MgPSB0ZXh0Q29tcG9uZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICAgIGlmICh0ZXh0Q29tcG9uZW50LnZhbHVlICYmIHN0YXJ0UG9zID49IDApIHtcbiAgICAgICAgICB0ZXh0ID0gdGV4dENvbXBvbmVudC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc2VsZWN0ZWRFbGVtID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKS5hbmNob3JOb2RlXG5cbiAgICAgIGlmIChzZWxlY3RlZEVsZW0gIT0gbnVsbCkge1xuICAgICAgICBsZXQgd29ya2luZ05vZGVDb250ZW50ID0gc2VsZWN0ZWRFbGVtLnRleHRDb250ZW50XG4gICAgICAgIGxldCBzZWxlY3RTdGFydE9mZnNldCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgIGlmICh3b3JraW5nTm9kZUNvbnRlbnQgJiYgc2VsZWN0U3RhcnRPZmZzZXQgPj0gMCkge1xuICAgICAgICAgIHRleHQgPSB3b3JraW5nTm9kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIHNlbGVjdFN0YXJ0T2Zmc2V0KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHRcbiAgfVxuXG4gIGdldExhc3RXb3JkSW5UZXh0KHRleHQpIHtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHUwMEEwL2csICcgJyk7IC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5ODUwNDA3L2hvdy1kby1pLXJlcGxhY2UtdW5pY29kZS1jaGFyYWN0ZXItdTAwYTAtd2l0aC1hLXNwYWNlLWluLWphdmFzY3JpcHRcbiAgICBsZXQgd29yZHNBcnJheSA9IHRleHQuc3BsaXQoJyAnKVxuICAgIGxldCB3b3JsZHNDb3VudCA9IHdvcmRzQXJyYXkubGVuZ3RoIC0gMVxuICAgIHJldHVybiB3b3Jkc0FycmF5W3dvcmxkc0NvdW50XS50cmltKClcbiAgfVxuXG4gIGdldFRyaWdnZXJJbmZvKG1lbnVBbHJlYWR5QWN0aXZlLCBoYXNUcmFpbGluZ1NwYWNlLCByZXF1aXJlTGVhZGluZ1NwYWNlLCBhbGxvd1NwYWNlcywgaXNBdXRvY29tcGxldGUpIHtcbiAgICBsZXQgY3R4ID0gdGhpcy50cmlidXRlLmN1cnJlbnRcbiAgICBsZXQgc2VsZWN0ZWQsIHBhdGgsIG9mZnNldFxuXG4gICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGN0eC5lbGVtZW50KSkge1xuICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzZWxlY3Rpb25JbmZvID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGVTZWxlY3RlZFBhdGgoY3R4KVxuXG4gICAgICBpZiAoc2VsZWN0aW9uSW5mbykge1xuICAgICAgICBzZWxlY3RlZCA9IHNlbGVjdGlvbkluZm8uc2VsZWN0ZWRcbiAgICAgICAgcGF0aCA9IHNlbGVjdGlvbkluZm8ucGF0aFxuICAgICAgICBvZmZzZXQgPSBzZWxlY3Rpb25JbmZvLm9mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBlZmZlY3RpdmVSYW5nZSA9IHRoaXMuZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKVxuICAgIGxldCBsYXN0V29yZE9mRWZmZWN0aXZlUmFuZ2UgPSB0aGlzLmdldExhc3RXb3JkSW5UZXh0KGVmZmVjdGl2ZVJhbmdlKVxuXG4gICAgaWYgKGlzQXV0b2NvbXBsZXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtZW50aW9uUG9zaXRpb246IGVmZmVjdGl2ZVJhbmdlLmxlbmd0aCAtIGxhc3RXb3JkT2ZFZmZlY3RpdmVSYW5nZS5sZW5ndGgsXG4gICAgICAgIG1lbnRpb25UZXh0OiBsYXN0V29yZE9mRWZmZWN0aXZlUmFuZ2UsXG4gICAgICAgIG1lbnRpb25TZWxlY3RlZEVsZW1lbnQ6IHNlbGVjdGVkLFxuICAgICAgICBtZW50aW9uU2VsZWN0ZWRQYXRoOiBwYXRoLFxuICAgICAgICBtZW50aW9uU2VsZWN0ZWRPZmZzZXQ6IG9mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlZmZlY3RpdmVSYW5nZSAhPT0gdW5kZWZpbmVkICYmIGVmZmVjdGl2ZVJhbmdlICE9PSBudWxsKSB7XG4gICAgICBsZXQgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID0gLTFcbiAgICAgIGxldCB0cmlnZ2VyQ2hhclxuXG4gICAgICB0aGlzLnRyaWJ1dGUuY29sbGVjdGlvbi5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgICAgIGxldCBjID0gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgbGV0IGlkeCA9IGNvbmZpZy5yZXF1aXJlTGVhZGluZ1NwYWNlID9cbiAgICAgICAgICB0aGlzLmxhc3RJbmRleFdpdGhMZWFkaW5nU3BhY2UoZWZmZWN0aXZlUmFuZ2UsIGMpIDpcbiAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5sYXN0SW5kZXhPZihjKVxuXG4gICAgICAgIGlmIChpZHggPiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MpIHtcbiAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPSBpZHhcbiAgICAgICAgICB0cmlnZ2VyQ2hhciA9IGNcbiAgICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlID0gY29uZmlnLnJlcXVpcmVMZWFkaW5nU3BhY2VcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA+PSAwICYmXG4gICAgICAgIChcbiAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPT09IDAgfHxcbiAgICAgICAgICAhcmVxdWlyZUxlYWRpbmdTcGFjZSB8fFxuICAgICAgICAgIC9bXFx4QTBcXHNdL2cudGVzdChcbiAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zIC0gMSxcbiAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGxldCBjdXJyZW50VHJpZ2dlclNuaXBwZXQgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zICsgMSxcbiAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5sZW5ndGgpXG5cbiAgICAgICAgdHJpZ2dlckNoYXIgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLCBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgKyAxKVxuICAgICAgICBsZXQgZmlyc3RTbmlwcGV0Q2hhciA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC5zdWJzdHJpbmcoMCwgMSlcbiAgICAgICAgbGV0IGxlYWRpbmdTcGFjZSA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC5sZW5ndGggPiAwICYmXG4gICAgICAgICAgKFxuICAgICAgICAgICAgZmlyc3RTbmlwcGV0Q2hhciA9PT0gJyAnIHx8XG4gICAgICAgICAgICBmaXJzdFNuaXBwZXRDaGFyID09PSAnXFx4QTAnXG4gICAgICAgICAgKVxuICAgICAgICBpZiAoaGFzVHJhaWxpbmdTcGFjZSkge1xuICAgICAgICAgIGN1cnJlbnRUcmlnZ2VyU25pcHBldCA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC50cmltKClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZWdleCA9IGFsbG93U3BhY2VzID8gL1teXFxTIF0vZyA6IC9bXFx4QTBcXHNdL2c7XG5cbiAgICAgICAgdGhpcy50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UgPSByZWdleC50ZXN0KGN1cnJlbnRUcmlnZ2VyU25pcHBldCk7XG5cbiAgICAgICAgaWYgKCFsZWFkaW5nU3BhY2UgJiYgKG1lbnVBbHJlYWR5QWN0aXZlIHx8ICEocmVnZXgudGVzdChjdXJyZW50VHJpZ2dlclNuaXBwZXQpKSkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWVudGlvblBvc2l0aW9uOiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MsXG4gICAgICAgICAgICBtZW50aW9uVGV4dDogY3VycmVudFRyaWdnZXJTbmlwcGV0LFxuICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkRWxlbWVudDogc2VsZWN0ZWQsXG4gICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRQYXRoOiBwYXRoLFxuICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkT2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICBtZW50aW9uVHJpZ2dlckNoYXI6IHRyaWdnZXJDaGFyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGFzdEluZGV4V2l0aExlYWRpbmdTcGFjZShzdHIsIGNoYXIpIHtcbiAgICBsZXQgcmV2ZXJzZWRTdHIgPSBzdHIuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKVxuICAgIGxldCBpbmRleCA9IC0xXG5cbiAgICBmb3IgKGxldCBjaWR4ID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgY2lkeCA8IGxlbjsgY2lkeCsrKSB7XG4gICAgICBsZXQgZmlyc3RDaGFyID0gY2lkeCA9PT0gc3RyLmxlbmd0aCAtIDFcbiAgICAgIGxldCBsZWFkaW5nU3BhY2UgPSAvXFxzLy50ZXN0KHJldmVyc2VkU3RyW2NpZHggKyAxXSlcbiAgICAgIGxldCBtYXRjaCA9IGNoYXIgPT09IHJldmVyc2VkU3RyW2NpZHhdXG5cbiAgICAgIGlmIChtYXRjaCAmJiAoZmlyc3RDaGFyIHx8IGxlYWRpbmdTcGFjZSkpIHtcbiAgICAgICAgaW5kZXggPSBzdHIubGVuZ3RoIC0gMSAtIGNpZHhcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXhcbiAgfVxuXG4gIGlzQ29udGVudEVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lOUFVUJyAmJiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnXG4gIH1cblxuICBpc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKSB7XG4gICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG5cbiAgICBsZXQgbWVudVRvcCA9IHR5cGVvZiBjb29yZGluYXRlcy50b3AgPT09ICdudW1iZXInID8gY29vcmRpbmF0ZXMudG9wIDogd2luZG93VG9wICsgd2luZG93SGVpZ2h0IC0gY29vcmRpbmF0ZXMuYm90dG9tIC0gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgbGV0IG1lbnVSaWdodCA9IHR5cGVvZiBjb29yZGluYXRlcy5yaWdodCA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy5yaWdodCA6IGNvb3JkaW5hdGVzLmxlZnQgKyBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgIGxldCBtZW51Qm90dG9tID0gdHlwZW9mIGNvb3JkaW5hdGVzLmJvdHRvbSA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy5ib3R0b20gOiBjb29yZGluYXRlcy50b3AgKyBtZW51RGltZW5zaW9ucy5oZWlnaHRcbiAgICBsZXQgbWVudUxlZnQgPSB0eXBlb2YgY29vcmRpbmF0ZXMubGVmdCA9PT0gJ251bWJlcicgPyBjb29yZGluYXRlcy5sZWZ0IDogd2luZG93TGVmdCArIHdpbmRvd1dpZHRoIC0gY29vcmRpbmF0ZXMucmlnaHQgLSBtZW51RGltZW5zaW9ucy53aWR0aFxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogbWVudVRvcCA8IE1hdGguZmxvb3Iod2luZG93VG9wKSxcbiAgICAgIHJpZ2h0OiBtZW51UmlnaHQgPiBNYXRoLmNlaWwod2luZG93TGVmdCArIHdpbmRvd1dpZHRoKSxcbiAgICAgIGJvdHRvbTogbWVudUJvdHRvbSA+IE1hdGguY2VpbCh3aW5kb3dUb3AgKyB3aW5kb3dIZWlnaHQpLFxuICAgICAgbGVmdDogbWVudUxlZnQgPCBNYXRoLmZsb29yKHdpbmRvd0xlZnQpXG4gICAgfVxuICB9XG5cbiAgZ2V0TWVudURpbWVuc2lvbnMoKSB7XG4gICAgLy8gV2lkdGggb2YgdGhlIG1lbnUgZGVwZW5kcyBvZiBpdHMgY29udGVudHMgYW5kIHBvc2l0aW9uXG4gICAgLy8gV2UgbXVzdCBjaGVjayB3aGF0IGl0cyB3aWR0aCB3b3VsZCBiZSB3aXRob3V0IGFueSBvYnN0cnVjdGlvblxuICAgIC8vIFRoaXMgd2F5LCB3ZSBjYW4gYWNoaWV2ZSBnb29kIHBvc2l0aW9uaW5nIGZvciBmbGlwcGluZyB0aGUgbWVudVxuICAgIGxldCBkaW1lbnNpb25zID0ge1xuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGxcbiAgICB9XG5cbiAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eTsgaGlkZGVuO2BcbiAgICBkaW1lbnNpb25zLndpZHRoID0gdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGhcbiAgICBkaW1lbnNpb25zLmhlaWdodCA9IHRoaXMudHJpYnV0ZS5tZW51Lm9mZnNldEhlaWdodFxuXG4gICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGBkaXNwbGF5OiBub25lO2BcblxuICAgIHJldHVybiBkaW1lbnNpb25zXG4gIH1cblxuICBnZXRUZXh0QXJlYU9ySW5wdXRVbmRlcmxpbmVQb3NpdGlvbihlbGVtZW50LCBwb3NpdGlvbiwgZmxpcHBlZCkge1xuICAgIGxldCBwcm9wZXJ0aWVzID0gWydkaXJlY3Rpb24nLCAnYm94U2l6aW5nJywgJ3dpZHRoJywgJ2hlaWdodCcsICdvdmVyZmxvd1gnLFxuICAgICAgJ292ZXJmbG93WScsICdib3JkZXJUb3BXaWR0aCcsICdib3JkZXJSaWdodFdpZHRoJyxcbiAgICAgICdib3JkZXJCb3R0b21XaWR0aCcsICdib3JkZXJMZWZ0V2lkdGgnLCAncGFkZGluZ1RvcCcsXG4gICAgICAncGFkZGluZ1JpZ2h0JywgJ3BhZGRpbmdCb3R0b20nLCAncGFkZGluZ0xlZnQnLFxuICAgICAgJ2ZvbnRTdHlsZScsICdmb250VmFyaWFudCcsICdmb250V2VpZ2h0JywgJ2ZvbnRTdHJldGNoJyxcbiAgICAgICdmb250U2l6ZScsICdmb250U2l6ZUFkanVzdCcsICdsaW5lSGVpZ2h0JywgJ2ZvbnRGYW1pbHknLFxuICAgICAgJ3RleHRBbGlnbicsICd0ZXh0VHJhbnNmb3JtJywgJ3RleHRJbmRlbnQnLFxuICAgICAgJ3RleHREZWNvcmF0aW9uJywgJ2xldHRlclNwYWNpbmcnLCAnd29yZFNwYWNpbmcnXG4gICAgXVxuXG4gICAgbGV0IGlzRmlyZWZveCA9ICh3aW5kb3cubW96SW5uZXJTY3JlZW5YICE9PSBudWxsKVxuXG4gICAgbGV0IGRpdiA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRpdi5pZCA9ICdpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2J1xuICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKGRpdilcblxuICAgIGxldCBzdHlsZSA9IGRpdi5zdHlsZVxuICAgIGxldCBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSA6IGVsZW1lbnQuY3VycmVudFN0eWxlXG5cbiAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJ1xuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnKSB7XG4gICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJ1xuICAgIH1cblxuICAgIC8vIHBvc2l0aW9uIG9mZi1zY3JlZW5cbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcblxuICAgIC8vIHRyYW5zZmVyIHRoZSBlbGVtZW50J3MgcHJvcGVydGllcyB0byB0aGUgZGl2XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgc3R5bGVbcHJvcF0gPSBjb21wdXRlZFtwcm9wXVxuICAgIH0pXG5cbiAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICBzdHlsZS53aWR0aCA9IGAkeyhwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyKX1weGBcbiAgICAgIGlmIChlbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpXG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICB9XG5cbiAgICBkaXYudGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBwb3NpdGlvbilcblxuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICBkaXYudGV4dENvbnRlbnQgPSBkaXYudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICfCoCcpXG4gICAgfVxuXG4gICAgbGV0IHNwYW4gPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgc3Bhbi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKHBvc2l0aW9uKSB8fCAnLidcbiAgICBkaXYuYXBwZW5kQ2hpbGQoc3BhbilcblxuICAgIGxldCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuXG4gICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgdG9wOiByZWN0LnRvcCArIHdpbmRvd1RvcCArIHNwYW4ub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VJbnQoY29tcHV0ZWQuZm9udFNpemUpIC0gZWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3dMZWZ0ICsgc3Bhbi5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyTGVmdFdpZHRoKVxuICAgIH1cblxuICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgbGV0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgbGV0IG1lbnVEaW1lbnNpb25zID0gdGhpcy5nZXRNZW51RGltZW5zaW9ucygpXG4gICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgIGlmIChtZW51SXNPZmZTY3JlZW4ucmlnaHQpIHtcbiAgICAgIGNvb3JkaW5hdGVzLnJpZ2h0ID0gd2luZG93V2lkdGggLSBjb29yZGluYXRlcy5sZWZ0XG4gICAgICBjb29yZGluYXRlcy5sZWZ0ID0gJ2F1dG8nXG4gICAgfVxuXG4gICAgbGV0IHBhcmVudEhlaWdodCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICA/IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyLm9mZnNldEhlaWdodFxuICAgICAgOiB0aGlzLmdldERvY3VtZW50KCkuYm9keS5vZmZzZXRIZWlnaHRcblxuICAgIGlmIChtZW51SXNPZmZTY3JlZW4uYm90dG9tKSB7XG4gICAgICBsZXQgcGFyZW50UmVjdCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgOiB0aGlzLmdldERvY3VtZW50KCkuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgbGV0IHNjcm9sbFN0aWxsQXZhaWxhYmxlID0gcGFyZW50SGVpZ2h0IC0gKHdpbmRvd0hlaWdodCAtIHBhcmVudFJlY3QudG9wKVxuXG4gICAgICBjb29yZGluYXRlcy5ib3R0b20gPSBzY3JvbGxTdGlsbEF2YWlsYWJsZSArICh3aW5kb3dIZWlnaHQgLSByZWN0LnRvcCAtIHNwYW4ub2Zmc2V0VG9wKVxuICAgICAgY29vcmRpbmF0ZXMudG9wID0gJ2F1dG8nXG4gICAgfVxuXG4gICAgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuICAgIGlmIChtZW51SXNPZmZTY3JlZW4ubGVmdCkge1xuICAgICAgY29vcmRpbmF0ZXMubGVmdCA9IHdpbmRvd1dpZHRoID4gbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgPyB3aW5kb3dMZWZ0ICsgd2luZG93V2lkdGggLSBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICA6IHdpbmRvd0xlZnRcbiAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5yaWdodFxuICAgIH1cbiAgICBpZiAobWVudUlzT2ZmU2NyZWVuLnRvcCkge1xuICAgICAgY29vcmRpbmF0ZXMudG9wID0gd2luZG93SGVpZ2h0ID4gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgID8gd2luZG93VG9wICsgd2luZG93SGVpZ2h0IC0gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgIDogd2luZG93VG9wXG4gICAgICBkZWxldGUgY29vcmRpbmF0ZXMuYm90dG9tXG4gICAgfVxuXG4gICAgdGhpcy5nZXREb2N1bWVudCgpLmJvZHkucmVtb3ZlQ2hpbGQoZGl2KVxuICAgIHJldHVybiBjb29yZGluYXRlc1xuICB9XG5cbiAgZ2V0Q29udGVudEVkaXRhYmxlQ2FyZXRQb3NpdGlvbihzZWxlY3RlZE5vZGVQb3NpdGlvbikge1xuICAgIGxldCBtYXJrZXJUZXh0Q2hhciA9ICfvu78nXG4gICAgbGV0IG1hcmtlckVsLCBtYXJrZXJJZCA9IGBzZWxfJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1fJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIpfWBcbiAgICBsZXQgcmFuZ2VcbiAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgIGxldCBwcmV2UmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKVxuXG4gICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcbiAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIHNlbGVjdGVkTm9kZVBvc2l0aW9uKVxuXG4gICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpXG5cbiAgICAvLyBDcmVhdGUgdGhlIG1hcmtlciBlbGVtZW50IGNvbnRhaW5pbmcgYSBzaW5nbGUgaW52aXNpYmxlIGNoYXJhY3RlciB1c2luZyBET00gbWV0aG9kcyBhbmQgaW5zZXJ0IGl0XG4gICAgbWFya2VyRWwgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgbWFya2VyRWwuaWQgPSBtYXJrZXJJZFxuXG4gICAgbWFya2VyRWwuYXBwZW5kQ2hpbGQodGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVRleHROb2RlKG1hcmtlclRleHRDaGFyKSlcbiAgICByYW5nZS5pbnNlcnROb2RlKG1hcmtlckVsKVxuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgIHNlbC5hZGRSYW5nZShwcmV2UmFuZ2UpXG5cbiAgICBsZXQgcmVjdCA9IG1hcmtlckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG4gICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCxcbiAgICAgIHRvcDogcmVjdC50b3AgKyBtYXJrZXJFbC5vZmZzZXRIZWlnaHQgKyB3aW5kb3dUb3BcbiAgICB9XG4gICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICBsZXQgbWVudURpbWVuc2lvbnMgPSB0aGlzLmdldE1lbnVEaW1lbnNpb25zKClcbiAgICBsZXQgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuXG4gICAgaWYgKG1lbnVJc09mZlNjcmVlbi5yaWdodCkge1xuICAgICAgY29vcmRpbmF0ZXMubGVmdCA9ICdhdXRvJ1xuICAgICAgY29vcmRpbmF0ZXMucmlnaHQgPSB3aW5kb3dXaWR0aCAtIHJlY3QubGVmdCAtIHdpbmRvd0xlZnRcbiAgICB9XG5cbiAgICBsZXQgcGFyZW50SGVpZ2h0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIub2Zmc2V0SGVpZ2h0XG4gICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5Lm9mZnNldEhlaWdodFxuXG4gICAgaWYgKG1lbnVJc09mZlNjcmVlbi5ib3R0b20pIHtcbiAgICAgIGxldCBwYXJlbnRSZWN0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBsZXQgc2Nyb2xsU3RpbGxBdmFpbGFibGUgPSBwYXJlbnRIZWlnaHQgLSAod2luZG93SGVpZ2h0IC0gcGFyZW50UmVjdC50b3ApXG5cbiAgICAgIGNvb3JkaW5hdGVzLnRvcCA9ICdhdXRvJ1xuICAgICAgY29vcmRpbmF0ZXMuYm90dG9tID0gc2Nyb2xsU3RpbGxBdmFpbGFibGUgKyAod2luZG93SGVpZ2h0IC0gcmVjdC50b3ApXG4gICAgfVxuXG4gICAgbWVudUlzT2ZmU2NyZWVuID0gdGhpcy5pc01lbnVPZmZTY3JlZW4oY29vcmRpbmF0ZXMsIG1lbnVEaW1lbnNpb25zKVxuICAgIGlmIChtZW51SXNPZmZTY3JlZW4ubGVmdCkge1xuICAgICAgY29vcmRpbmF0ZXMubGVmdCA9IHdpbmRvd1dpZHRoID4gbWVudURpbWVuc2lvbnMud2lkdGhcbiAgICAgICAgPyB3aW5kb3dMZWZ0ICsgd2luZG93V2lkdGggLSBtZW51RGltZW5zaW9ucy53aWR0aFxuICAgICAgICA6IHdpbmRvd0xlZnRcbiAgICAgIGRlbGV0ZSBjb29yZGluYXRlcy5yaWdodFxuICAgIH1cbiAgICBpZiAobWVudUlzT2ZmU2NyZWVuLnRvcCkge1xuICAgICAgY29vcmRpbmF0ZXMudG9wID0gd2luZG93SGVpZ2h0ID4gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgID8gd2luZG93VG9wICsgd2luZG93SGVpZ2h0IC0gbWVudURpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgIDogd2luZG93VG9wXG4gICAgICBkZWxldGUgY29vcmRpbmF0ZXMuYm90dG9tXG4gICAgfVxuXG4gICAgbWFya2VyRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtYXJrZXJFbClcbiAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgfVxuXG4gIHNjcm9sbEludG9WaWV3KGVsZW0pIHtcbiAgICBsZXQgcmVhc29uYWJsZUJ1ZmZlciA9IDIwLFxuICAgICAgY2xpZW50UmVjdFxuICAgIGxldCBtYXhTY3JvbGxEaXNwbGFjZW1lbnQgPSAxMDBcbiAgICBsZXQgZSA9IHRoaXMubWVudVxuXG4gICAgaWYgKHR5cGVvZiBlID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgd2hpbGUgKGNsaWVudFJlY3QgPT09IHVuZGVmaW5lZCB8fCBjbGllbnRSZWN0LmhlaWdodCA9PT0gMCkge1xuICAgICAgY2xpZW50UmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgaWYgKGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgIGUgPSBlLmNoaWxkTm9kZXNbMF1cbiAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCB8fCAhZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBlbGVtVG9wID0gY2xpZW50UmVjdC50b3BcbiAgICBsZXQgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBjbGllbnRSZWN0LmhlaWdodFxuXG4gICAgaWYgKGVsZW1Ub3AgPCAwKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnBhZ2VZT2Zmc2V0ICsgY2xpZW50UmVjdC50b3AgLSByZWFzb25hYmxlQnVmZmVyKVxuICAgIH0gZWxzZSBpZiAoZWxlbUJvdHRvbSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgbGV0IG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBjbGllbnRSZWN0LnRvcCAtIHJlYXNvbmFibGVCdWZmZXJcblxuICAgICAgaWYgKG1heFkgLSB3aW5kb3cucGFnZVlPZmZzZXQgPiBtYXhTY3JvbGxEaXNwbGFjZW1lbnQpIHtcbiAgICAgICAgbWF4WSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIG1heFNjcm9sbERpc3BsYWNlbWVudFxuICAgICAgfVxuXG4gICAgICBsZXQgdGFyZ2V0WSA9IHdpbmRvdy5wYWdlWU9mZnNldCAtICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBlbGVtQm90dG9tKVxuXG4gICAgICBpZiAodGFyZ2V0WSA+IG1heFkpIHtcbiAgICAgICAgdGFyZ2V0WSA9IG1heFlcbiAgICAgIH1cblxuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRhcmdldFkpXG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVJhbmdlO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0eW9yay9mdXp6eVxuY2xhc3MgVHJpYnV0ZVNlYXJjaCB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5zZWFyY2ggPSB0aGlzXG4gICAgfVxuXG4gICAgc2ltcGxlRmlsdGVyKHBhdHRlcm4sIGFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoc3RyaW5nID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlc3QocGF0dGVybiwgc3RyaW5nKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRlc3QocGF0dGVybiwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0cmluZykgIT09IG51bGxcbiAgICB9XG5cbiAgICBtYXRjaChwYXR0ZXJuLCBzdHJpbmcsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICAgICAgbGV0IHBhdHRlcm5JZHggPSAwLFxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICBsZW4gPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxTY29yZSA9IDAsXG4gICAgICAgICAgICBjdXJyU2NvcmUgPSAwLFxuICAgICAgICAgICAgcHJlID0gb3B0cy5wcmUgfHwgJycsXG4gICAgICAgICAgICBwb3N0ID0gb3B0cy5wb3N0IHx8ICcnLFxuICAgICAgICAgICAgY29tcGFyZVN0cmluZyA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBzdHJpbmcgfHwgc3RyaW5nLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBjaCwgY29tcGFyZUNoYXJcblxuICAgICAgICBwYXR0ZXJuID0gb3B0cy5jYXNlU2Vuc2l0aXZlICYmIHBhdHRlcm4gfHwgcGF0dGVybi50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgbGV0IHBhdHRlcm5DYWNoZSA9IHRoaXMudHJhdmVyc2UoY29tcGFyZVN0cmluZywgcGF0dGVybiwgMCwgMCwgW10pXG4gICAgICAgIGlmICghcGF0dGVybkNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcmVkOiB0aGlzLnJlbmRlcihzdHJpbmcsIHBhdHRlcm5DYWNoZS5jYWNoZSwgcHJlLCBwb3N0KSxcbiAgICAgICAgICAgIHNjb3JlOiBwYXR0ZXJuQ2FjaGUuc2NvcmVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgc3RyaW5nSW5kZXgsIHBhdHRlcm5JbmRleCwgcGF0dGVybkNhY2hlKSB7XG4gICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIHNlYXJjaCBhdCBlbmRcbiAgICAgICAgaWYgKHBhdHRlcm4ubGVuZ3RoID09PSBwYXR0ZXJuSW5kZXgpIHtcblxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHNjb3JlIGFuZCBjb3B5IHRoZSBjYWNoZSBjb250YWluaW5nIHRoZSBpbmRpY2VzIHdoZXJlIGl0J3MgZm91bmRcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2NvcmU6IHRoaXMuY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSxcbiAgICAgICAgICAgICAgICBjYWNoZTogcGF0dGVybkNhY2hlLnNsaWNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHN0cmluZyBhdCBlbmQgb3IgcmVtYWluaW5nIHBhdHRlcm4gPiByZW1haW5pbmcgc3RyaW5nXG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSBzdHJpbmdJbmRleCB8fCBwYXR0ZXJuLmxlbmd0aCAtIHBhdHRlcm5JbmRleCA+IHN0cmluZy5sZW5ndGggLSBzdHJpbmdJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGMgPSBwYXR0ZXJuW3BhdHRlcm5JbmRleF1cbiAgICAgICAgbGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgc3RyaW5nSW5kZXgpXG4gICAgICAgIGxldCBiZXN0LCB0ZW1wXG5cbiAgICAgICAgd2hpbGUgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wdXNoKGluZGV4KVxuICAgICAgICAgICAgdGVtcCA9IHRoaXMudHJhdmVyc2Uoc3RyaW5nLCBwYXR0ZXJuLCBpbmRleCArIDEsIHBhdHRlcm5JbmRleCArIDEsIHBhdHRlcm5DYWNoZSlcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wb3AoKVxuXG4gICAgICAgICAgICAvLyBpZiBkb3duc3RyZWFtIHRyYXZlcnNhbCBmYWlsZWQsIHJldHVybiBiZXN0IGFuc3dlciBzbyBmYXJcbiAgICAgICAgICAgIGlmICghdGVtcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiZXN0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYmVzdCB8fCBiZXN0LnNjb3JlIDwgdGVtcC5zY29yZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSB0ZW1wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgaW5kZXggKyAxKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJlc3RcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTY29yZShwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgbGV0IHNjb3JlID0gMFxuICAgICAgICBsZXQgdGVtcCA9IDFcblxuICAgICAgICBwYXR0ZXJuQ2FjaGUuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuQ2FjaGVbaSAtIDFdICsgMSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCArPSB0ZW1wICsgMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3JlICs9IHRlbXBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gc2NvcmVcbiAgICB9XG5cbiAgICByZW5kZXIoc3RyaW5nLCBpbmRpY2VzLCBwcmUsIHBvc3QpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVkID0gc3RyaW5nLnN1YnN0cmluZygwLCBpbmRpY2VzWzBdKVxuXG4gICAgICAgIGluZGljZXMuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIHJlbmRlcmVkICs9IHByZSArIHN0cmluZ1tpbmRleF0gKyBwb3N0ICtcbiAgICAgICAgICAgICAgICBzdHJpbmcuc3Vic3RyaW5nKGluZGV4ICsgMSwgKGluZGljZXNbaSArIDFdKSA/IGluZGljZXNbaSArIDFdIDogc3RyaW5nLmxlbmd0aClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcmVuZGVyZWRcbiAgICB9XG5cbiAgICBmaWx0ZXIocGF0dGVybiwgYXJyLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIHJldHVybiBhcnJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGVsZW1lbnQsIGlkeCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IGVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLmV4dHJhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gb3B0cy5leHRyYWN0KGVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHIpIHsgLy8gdGFrZSBjYXJlIG9mIHVuZGVmaW5lZHMgLyBudWxscyAvIGV0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWQgPSB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0ciwgb3B0cylcblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbcHJldi5sZW5ndGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nOiByZW5kZXJlZC5yZW5kZXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiByZW5kZXJlZC5zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZcbiAgICAgICAgICAgIH0sIFtdKVxuXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tcGFyZSA9IGIuc2NvcmUgLSBhLnNjb3JlXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkgcmV0dXJuIGNvbXBhcmVcbiAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleFxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVNlYXJjaDtcbiIsIi8qKlxuKiBUcmlidXRlLmpzXG4qIE5hdGl2ZSBFUzYgSmF2YVNjcmlwdCBAbWVudGlvbiBQbHVnaW5cbioqL1xuXG5pbXBvcnQgVHJpYnV0ZSBmcm9tIFwiLi9UcmlidXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGU7XG4iLCJpZiAoIUFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ID0gT2JqZWN0KHRoaXMpXG4gICAgICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMFxuICAgICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXVxuICAgICAgICB2YXIgdmFsdWVcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGxpc3RbaV1cbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxufVxuXG5pZiAod2luZG93ICYmIHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgIT09IFwiZnVuY3Rpb25cIikge1xuICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICBkZXRhaWw6IHVuZGVmaW5lZFxuICAgIH1cbiAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpXG4gICAgcmV0dXJuIGV2dFxuICB9XG5cbiBpZiAodHlwZW9mIHdpbmRvdy5FdmVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGVcbiB9XG5cbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnRcbn0iXX0=
