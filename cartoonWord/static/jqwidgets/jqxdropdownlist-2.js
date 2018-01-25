/*
jQWidgets v5.5.0 (2017-Dec)
Copyright (c) 2011-2017 jQWidgets.
License: https://jqwidgets.com/license/
*/

(function(a) {
    a.jqx.jqxWidget("jqxDropDownList", "", {});
    a.extend(a.jqx._jqxDropDownList.prototype, {
        defineInstance: function() {
            var b = {
                disabled: false,
                width: null,
                height: null,
                items: new Array(),
                selectedIndex: -1,
                source: null,
                scrollBarSize: 15,
                arrowSize: 19,
                enableHover: true,
                enableSelection: true,
                autoItemsHeight: false,
                visualItems: new Array(),
                groups: new Array(),
                equalItemsWidth: true,
                itemHeight: -1,
                visibleItems: new Array(),
                emptyGroupText: "Group",
                checkboxes: false,
                openDelay: 250,
                closeDelay: 300,
                dropDownContainer: "default",
                animationType: "default",
                autoOpen: false,
                dropDownWidth: "auto",
                dropDownHeight: "200px",
                autoDropDownHeight: false,
                keyboardSelection: true,
                enableBrowserBoundsDetection: false,
                dropDownHorizontalAlignment: "left",
                dropDownVerticalAlignment: "bottom",
                displayMember: "",
                valueMember: "",
                groupMember: "",
                searchMember: "",
                searchMode: "startswithignorecase",
                incrementalSearch: true,
                incrementalSearchDelay: 700,
                renderer: null,
                placeHolder: "请选择:",
                promptText: "请选择:",
                emptyString: "",
                rtl: false,
                selectionRenderer: null,
                listBox: null,
                popupZIndex: 2000,
                renderMode: "default",
                touchMode: "auto",
                _checkForHiddenParent: true,
                autoBind: true,
                ready: null,
                focusable: true,
                filterable: false,
                filterHeight: 27,
                filterPlaceHolder: "Looking for",
                filterDelay: 100,
                template: "default",
                aria: {
                    "aria-disabled": {
                        name: "disabled",
                        type: "boolean"
                    }
                },
                events: ["open", "close", "select", "unselect", "change", "checkChange", "bindingComplete", "itemAdd", "itemRemove", "itemUpdate"]
            };
            if (this === a.jqx._jqxDropDownList.prototype) {
                return b
            }
            a.extend(true, this, b);
            return b
        },
        createInstance: function(b) {
            this.render()
        },
        render: function() {
            var q = this;
            if (!q.width) {
                q.width = 200
            }
            if (!q.height) {
                q.height = 25
            }
            var o = q.element.nodeName.toLowerCase();
            if (o == "select" || o == "ul" || o == "ol") {
                q.field = q.element;
                if (q.field.className) {
                    q._className = q.field.className
                }
                var k = {
                    title: q.field.title
                };
                if (q.field.id.length) {
                    k.id = q.field.id.replace(/[^\w]/g, "_") + "_jqxDropDownList"
                } else {
                    k.id = a.jqx.utilities.createId() + "_jqxDropDownList"
                }
                var c = a("<div></div>", k);
                if (!q.width) {
                    q.width = a(q.field).width()
                }
                if (!q.height) {
                    q.height = a(q.field).outerHeight()
                }
                c[0].style.cssText = q.field.style.cssText;
                a(q.field).hide().after(c);
                var i = q.host.data();
                q.host = c;
                q.host.data(i);
                q.element = c[0];
                q.element.id = q.field.id;
                q.field.id = k.id;
                if (q._className) {
                    q.host.addClass(q._className);
                    a(q.field).removeClass(q._className)
                }
                if (q.field.tabIndex) {
                    var f = q.field.tabIndex;
                    q.field.tabIndex = -1;
                    q.element.tabIndex = f
                }
                var r = a.jqx.parseSourceTag(q.field);
                q.source = r.items;
                if (q.selectedIndex == -1) {
                    q.selectedIndex = r.index
                }
            } else {
                if (q.host.find("li").length > 0 || q.host.find("option").length > 0) {
                    var r = a.jqx.parseSourceTag(q.element);
                    q.source = r.items
                }
            }
            q.element.innerHTML = "";
            q.isanimating = false;
            q.id = q.element.id || a.jqx.utilities.createId();
            q.host.attr("role", "combobox");
            a.jqx.aria(q, "aria-autocomplete", "both");
            a.jqx.aria(q, "aria-readonly", false);
            var g = "<div style='background-color: transparent; -webkit-appearance: none; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; border: 0px; position: relative;'><div id='dropdownlistWrapper' style='overflow: hidden; outline: none; background-color: transparent; border: none; float: left; width:100%; height: 100%; position: relative;'><div id='dropdownlistContent' unselectable='on' style='outline: none; background-color: transparent; border: none; float: left; position: relative;'></div><div id='dropdownlistArrow' unselectable='on' style='background-color: transparent; border: none; float: right; position: relative;'><div unselectable='on'></div></div></div></div>";
            if (a.jqx._jqxListBox == null || a.jqx._jqxListBox == undefined) {
                throw new Error("jqxDropDownList: Missing reference to jqxlistbox.js.")
            }
            if (q.host.attr("tabindex")) {} else {
                q.host.attr("tabindex", 0)
            }
            var l = q;
            q.touch = a.jqx.mobile.isTouchDevice();
            q.comboStructure = g;
            q.element.innerHTML = g;
            q.dropdownlistWrapper = a(q.element.firstChild.firstChild);
            q.dropdownlistArrow = a(q.dropdownlistWrapper[0].firstChild.nextSibling);
            q.arrow = a(q.dropdownlistArrow[0].firstChild);
            q.dropdownlistContent = a(q.dropdownlistWrapper[0].firstChild);
            q.dropdownlistContent.addClass(q.toThemeProperty("jqx-dropdownlist-content jqx-disableselect"));
            if (q.rtl) {
                q.dropdownlistContent.addClass(q.toThemeProperty("jqx-rtl jqx-dropdownlist-content-rtl"))
            }
            q.addHandler(q.dropdownlistWrapper, "selectstart", function() {
                return false
            });
            q.dropdownlistWrapper[0].id = "dropdownlistWrapper" + q.element.id;
            q.dropdownlistArrow[0].id = "dropdownlistArrow" + q.element.id;
            q.dropdownlistContent[0].id = "dropdownlistContent" + q.element.id;
            q._addInput();
            if (q.promptText != "请选择:") {
                q.placeHolder = q.promptText
            }
            var n = q.toThemeProperty("jqx-widget") + " " + q.toThemeProperty("jqx-dropdownlist-state-normal") + " " + q.toThemeProperty("jqx-rc-all") + " " + q.toThemeProperty("jqx-fill-state-normal");
            q.element.className += " " + n;
            q._firstDiv = a(q.element.firstChild);
            try {
                var p = "listBox" + q.id;
                var h = a(a.find("#" + p));
                if (h.length > 0) {
                    h.remove()
                }
                a.jqx.aria(q, "aria-owns", p);
                a.jqx.aria(q, "aria-haspopup", true);
                var b = a("<div style='overflow: hidden; background-color: transparent; border: none; position: absolute;' id='listBox" + q.id + "'><div id='innerListBox" + q.id + "'></div></div>");
                b.hide();
                if (q.dropDownContainer == "element") {
                    b.appendTo(q.host)
                } else {
                    b.appendTo(document.body)
                }
                q.container = b;
                q.listBoxContainer = a(a.find("#innerListBox" + q.id));
                var d = q.width;
                if (q.dropDownWidth != "auto") {
                    d = q.dropDownWidth
                }
                if (d == null) {
                    d = q.host.width();
                    if (d == 0) {
                        d = q.dropDownWidth
                    }
                }
                if (q.dropDownHeight == null) {
                    q.dropDownHeight = 200
                }
                var l = q;
                q.container.width(parseInt(d) + 25);
                q.container.height(parseInt(q.dropDownHeight) + 25);
                q._ready = false;
                q.addHandler(q.listBoxContainer, "bindingComplete", function(e) {
                    if (!q.listBox) {
                        q.listBox = a.data(q.listBoxContainer[0], "jqxListBox").instance
                    }
                    if (q.selectedIndex != q.listBoxContainer.jqxListBox("selectedIndex")) {
                        q.listBox = a.data(q.listBoxContainer[0], "jqxListBox").instance;
                        q.listBoxContainer.jqxListBox({
                            selectedIndex: q.selectedIndex
                        });
                        q.renderSelection("mouse")
                    } else {
                        q.renderSelection("mouse")
                    }
                    if (!q._ready) {
                        if (q.ready) {
                            q.ready()
                        }
                        q._ready = true
                    }
                    q._raiseEvent("6")
                });
                q.addHandler(q.listBoxContainer, "itemAdd", function(e) {
                    q._raiseEvent("7", e.args)
                });
                q.addHandler(q.listBoxContainer, "itemRemove", function(e) {
                    q._raiseEvent("8", e.args)
                });
                q.addHandler(q.listBoxContainer, "itemUpdate", function(e) {
                    q._raiseEvent("9", e.args)
                });
                q.listBoxContainer.jqxListBox({
                    filterHeight: q.filterHeight,
                    filterPlaceHolder: q.filterPlaceHolder,
                    filterDelay: q.filterDelay,
                    autoItemsHeight: q.autoItemsHeight,
                    filterable: q.filterable,
                    allowDrop: false,
                    allowDrag: false,
                    autoBind: q.autoBind,
                    _checkForHiddenParent: false,
                    focusable: q.focusable,
                    touchMode: q.touchMode,
                    checkboxes: q.checkboxes,
                    rtl: q.rtl,
                    _renderOnDemand: true,
                    emptyString: q.emptyString,
                    itemHeight: q.itemHeight,
                    width: d,
                    searchMode: q.searchMode,
                    incrementalSearch: q.incrementalSearch,
                    incrementalSearchDelay: q.incrementalSearchDelay,
                    groupMember: q.groupMember,
                    searchMember: q.searchMember,
                    displayMember: q.displayMember,
                    valueMember: q.valueMember,
                    height: q.dropDownHeight,
                    autoHeight: q.autoDropDownHeight,
                    scrollBarSize: q.scrollBarSize,
                    selectedIndex: q.selectedIndex,
                    source: q.source,
                    theme: q.theme,
                    rendered: function() {
                        if (q.selectedIndex != q.listBoxContainer.jqxListBox("selectedIndex")) {
                            q.listBox = a.data(q.listBoxContainer[0], "jqxListBox").instance;
                            q.listBoxContainer.jqxListBox({
                                selectedIndex: q.selectedIndex
                            });
                            q.renderSelection("mouse")
                        } else {
                            q.renderSelection("mouse")
                        }
                    },
                    renderer: q.renderer,
                    filterChange: function(e) {
                        if (q.autoDropDownHeight) {
                            q.container.height(q.listBoxContainer.height() + 25)
                        }
                    }
                });
                if (q.dropDownContainer === "element") {
                    q.listBoxContainer.css({
                        position: "absolute",
                        top: 0,
                        left: 0
                    })
                } else {
                    q.listBoxContainer.css({
                        position: "absolute",
                        zIndex: q.popupZIndex,
                        top: 0,
                        left: 0
                    })
                }
                if (q.template) {
                    q.listBoxContainer.addClass(q.toThemeProperty("jqx-" + q.template + "-item"))
                }
                q.listBox = a.data(q.listBoxContainer[0], "jqxListBox").instance;
                q.listBox.enableSelection = q.enableSelection;
                q.listBox.enableHover = q.enableHover;
                q.listBox.equalItemsWidth = q.equalItemsWidth;
                q.listBox.selectIndex(q.selectedIndex);
                q.listBox._arrange();
                q.listBoxContainer.addClass(q.toThemeProperty("jqx-popup"));
                if (a.jqx.browser.msie) {
                    q.listBoxContainer.addClass(q.toThemeProperty("jqx-noshadow"))
                }
                q.addHandler(q.listBoxContainer, "unselect", function(e) {
                    q._raiseEvent("3", {
                        index: e.args.index,
                        type: e.args.type,
                        item: e.args.item
                    })
                });
                q.addHandler(q.listBoxContainer, "change", function(e) {
                    if (e.args) {
                        if (e.args.type != "keyboard") {
                            q._raiseEvent("4", {
                                index: e.args.index,
                                type: e.args.type,
                                item: e.args.item
                            })
                        } else {
                            if (e.args.type == "keyboard") {
                                if (!q.isOpened()) {
                                    q._raiseEvent("4", {
                                        index: q.selectedIndex,
                                        type: "keyboard",
                                        item: q.getItem(q.selectedIndex)
                                    })
                                }
                            }
                        }
                    }
                });
                if (q.animationType == "none") {
                    q.container.css("display", "none")
                } else {
                    q.container.hide()
                }
            } catch (j) {
                if (console) {
                    console.log(j)
                }
            }
            var q = q;
            q.propertyChangeMap.disabled = function(e, t, s, u) {
                if (u) {
                    e.host.addClass(q.toThemeProperty("jqx-dropdownlist-state-disabled"));
                    e.host.addClass(q.toThemeProperty("jqx-fill-state-disabled"));
                    e.dropdownlistContent.addClass(q.toThemeProperty("jqx-dropdownlist-content-disabled"))
                } else {
                    e.host.removeClass(q.toThemeProperty("jqx-dropdownlist-state-disabled"));
                    e.host.removeClass(q.toThemeProperty("jqx-fill-state-disabled"));
                    e.dropdownlistContent.removeClass(q.toThemeProperty("jqx-dropdownlist-content-disabled"))
                }
                a.jqx.aria(e, "aria-disabled", e.disabled)
            }
            ;
            if (q.disabled) {
                q.host.addClass(q.toThemeProperty("jqx-dropdownlist-state-disabled"));
                q.host.addClass(q.toThemeProperty("jqx-fill-state-disabled"));
                q.dropdownlistContent.addClass(q.toThemeProperty("jqx-dropdownlist-content-disabled"))
            }
            if (q.dropDownVerticalAlignment == "top") {
                q.arrow.addClass(q.toThemeProperty("jqx-icon-arrow-up"))
            } else {
                q.arrow.addClass(q.toThemeProperty("jqx-icon-arrow-down"))
            }
            q.arrow.addClass(q.toThemeProperty("jqx-icon"));
            if (q.renderMode === "simple") {
                q.arrow.remove();
                q.host.removeClass(q.toThemeProperty("jqx-fill-state-normal"));
                q.host.removeClass(q.toThemeProperty("jqx-rc-all"))
            }
            if (q.template) {
                q.host.addClass(q.toThemeProperty("jqx-" + q.template))
            }
            q._updateHandlers();
            q._setSize();
            q._arrange();
            if (q.listBox) {
                q.renderSelection()
            }
            if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                if (q.host.parents(".jqx-window").length > 0) {
                    var m = q.host.parents(".jqx-window").css("z-index");
                    b.css("z-index", m + 10);
                    q.listBoxContainer.css("z-index", m + 10)
                }
            }
        },
        resize: function(c, b) {
            this.width = c;
            this.height = b;
            this._setSize();
            this._arrange()
        },
        val: function(c) {
            if (!this.dropdownlistContent) {
                return ""
            }
            var d = function(f) {
                for (var e in f) {
                    if (f.hasOwnProperty(e)) {
                        return false
                    }
                }
                if (typeof c == "number") {
                    return false
                }
                if (typeof c == "date") {
                    return false
                }
                if (typeof c == "boolean") {
                    return false
                }
                if (typeof c == "string") {
                    return false
                }
                return true
            };
            if (this.input && (d(c) || arguments.length == 0)) {
                return this.input.val()
            }
            var b = this.getItemByValue(c);
            if (b != null) {
                this.selectItem(b)
            }
            if (this.input) {
                return this.input.val()
            }
        },
        focus: function() {
            try {
                var d = this;
                var c = function() {
                    if (d.host) {
                        d.host.focus();
                        if (d._firstDiv) {
                            d._firstDiv.focus()
                        }
                    }
                };
                c();
                setTimeout(function() {
                    c()
                }, 10)
            } catch (b) {}
        },
        _addInput: function() {
            var b = this.host.attr("name");
            this.input = a("<input type='hidden'/>");
            this.host.append(this.input);
            if (b) {
                this.input.attr("name", b)
            }
        },
        getItems: function() {
            if (!this.listBox) {
                return new Array()
            }
            return this.listBox.items
        },
        getVisibleItems: function() {
            return this.listBox.getVisibleItems()
        },
        _setSize: function() {
            if (this.width != null && this.width.toString().indexOf("px") != -1) {
                this.element.style.width = this.width
            } else {
                if (this.width != undefined && !isNaN(this.width)) {
                    this.element.style.width = this.width + "px"
                }
            }
            if (this.height != null && this.height.toString().indexOf("px") != -1) {
                this.element.style.height = this.height
            } else {
                if (this.height != undefined && !isNaN(this.height)) {
                    this.element.style.height = this.height + "px"
                }
            }
            var e = false;
            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                e = true;
                this.element.style.width = this.width
            }
            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                e = true;
                this.element.style.height = this.height
            }
            var c = this;
            var d = function() {
                c._arrange();
                if (c.dropDownWidth == "auto") {
                    var f = c.host.width();
                    c.listBoxContainer.jqxListBox({
                        width: f
                    });
                    c.container.width(parseInt(f) + 25)
                }
            };
            if (e) {
                var b = this.host.width();
                if (this.dropDownWidth != "auto") {
                    b = this.dropDownWidth
                }
                this.listBoxContainer.jqxListBox({
                    width: b
                });
                this.container.width(parseInt(b) + 25)
            }
            a.jqx.utilities.resize(this.host, function() {
                d()
            }, false, this._checkForHiddenParent)
        },
        isOpened: function() {
            var c = this;
            var b = a.data(document.body, "openedJQXListBox" + this.id);
            if (b != null && b == c.listBoxContainer) {
                return true
            }
            return false
        },
        _updateHandlers: function() {
            var c = this;
            var d = false;
            this.removeHandlers();
            if (!this.touch) {
                this.addHandler(this.host, "mouseenter", function() {
                    if (!c.disabled && c.enableHover && c.renderMode !== "simple") {
                        d = true;
                        c.host.addClass(c.toThemeProperty("jqx-dropdownlist-state-hover"));
                        if (c.dropDownVerticalAlignment == "top") {
                            c.arrow.addClass(c.toThemeProperty("jqx-icon-arrow-up-hover"))
                        } else {
                            c.arrow.addClass(c.toThemeProperty("jqx-icon-arrow-down-hover"))
                        }
                        c.host.addClass(c.toThemeProperty("jqx-fill-state-hover"))
                    }
                });
                this.addHandler(this.host, "mouseleave", function() {
                    if (!c.disabled && c.enableHover && c.renderMode !== "simple") {
                        c.host.removeClass(c.toThemeProperty("jqx-dropdownlist-state-hover"));
                        c.host.removeClass(c.toThemeProperty("jqx-fill-state-hover"));
                        c.arrow.removeClass(c.toThemeProperty("jqx-icon-arrow-down-hover"));
                        c.arrow.removeClass(c.toThemeProperty("jqx-icon-arrow-up-hover"));
                        d = false
                    }
                })
            }
            if (this.host.parents()) {
                this.addHandler(this.host.parents(), "scroll.dropdownlist" + this.element.id, function(e) {
                    var f = c.isOpened();
                    if (f) {
                        c.close()
                    }
                })
            }
            var b = "mousedown";
            if (this.touch) {
                b = a.jqx.mobile.getTouchEventName("touchstart")
            }
            this.addHandler(this.dropdownlistWrapper, b, function(f) {
                if (!c.disabled) {
                    var e = c.container.css("display") == "block";
                    if (!c.isanimating) {
                        if (e) {
                            c.hideListBox();
                            return false
                        } else {
                            c.showListBox();
                            if (!c.focusable) {
                                if (f.preventDefault) {
                                    f.preventDefault()
                                }
                            } else {
                                c.focus()
                            }
                        }
                    }
                }
            });
            if (c.autoOpen) {
                this.addHandler(this.host, "mouseenter", function() {
                    var e = c.isOpened();
                    if (!e && c.autoOpen) {
                        c.open();
                        c.host.focus()
                    }
                });
                a(document).on("mousemove." + c.id, function(h) {
                    var g = c.isOpened();
                    if (g && c.autoOpen) {
                        var l = c.host.coord();
                        var k = l.top;
                        var j = l.left;
                        var i = c.container.coord();
                        var e = i.left;
                        var f = i.top;
                        canClose = true;
                        if (h.pageY >= k && h.pageY <= k + c.host.height()) {
                            if (h.pageX >= j && h.pageX < j + c.host.width()) {
                                canClose = false
                            }
                        }
                        if (h.pageY >= f && h.pageY <= f + c.container.height()) {
                            if (h.pageX >= e && h.pageX < e + c.container.width()) {
                                canClose = false
                            }
                        }
                        if (canClose) {
                            c.close()
                        }
                    }
                })
            }
            if (this.touch) {
                this.addHandler(a(document), a.jqx.mobile.getTouchEventName("touchstart") + "." + this.id, c.closeOpenedListBox, {
                    me: this,
                    listbox: this.listBox,
                    id: this.id
                })
            } else {
                this.addHandler(a(document), "mousedown." + this.id, c.closeOpenedListBox, {
                    me: this,
                    listbox: this.listBox,
                    id: this.id
                })
            }
            this.addHandler(this.host, "keydown", function(f) {
                var e = c.container.css("display") == "block";
                if (c.host.css("display") == "none") {
                    return true
                }
                if (f.keyCode == "13" || f.keyCode == "9") {
                    if (!c.isanimating) {
                        if (e) {
                            c.renderSelection();
                            if (f.keyCode == "13" && c.focusable) {
                                c._firstDiv.focus()
                            }
                            c.hideListBox();
                            if (!c.keyboardSelection) {
                                c._raiseEvent("2", {
                                    index: c.selectedIndex,
                                    type: "keyboard",
                                    item: c.getItem(c.selectedIndex)
                                })
                            }
                            if (f.keyCode == "13") {
                                c._raiseEvent("4", {
                                    index: c.selectedIndex,
                                    type: "keyboard",
                                    item: c.getItem(c.selectedIndex)
                                })
                            }
                        }
                        if (e && f.keyCode != "9") {
                            return false
                        }
                        return true
                    }
                }
                if (f.keyCode == 115) {
                    if (!c.isanimating) {
                        if (!c.isOpened()) {
                            c.showListBox()
                        } else {
                            if (c.isOpened()) {
                                c.hideListBox()
                            }
                        }
                    }
                    return false
                }
                if (f.altKey) {
                    if (c.host.css("display") == "block") {
                        if (f.keyCode == 38) {
                            if (c.isOpened()) {
                                c.hideListBox();
                                return true
                            }
                        } else {
                            if (f.keyCode == 40) {
                                if (!c.isOpened()) {
                                    c.showListBox();
                                    return true
                                }
                            }
                        }
                    }
                }
                if (f.keyCode == "27") {
                    if (!c.ishiding) {
                        if (c.isOpened()) {
                            c.hideListBox();
                            if (c.tempSelectedIndex != undefined) {
                                c.selectIndex(c.tempSelectedIndex)
                            }
                        }
                        return true
                    }
                }
                if (!c.disabled) {
                    c._kbnavigated = c.listBox._handleKeyDown(f);
                    return c._kbnavigated
                }
            });
            this.addHandler(this.listBoxContainer, "checkChange", function(e) {
                c.renderSelection();
                c._updateInputSelection();
                c._raiseEvent(5, {
                    label: e.args.label,
                    value: e.args.value,
                    checked: e.args.checked,
                    item: e.args.item
                })
            });
            this.addHandler(this.listBoxContainer, "select", function(e) {
                if (!c.disabled) {
                    if (!e.args) {
                        return
                    }
                    if (e.args.type == "keyboard" && !c.isOpened()) {
                        c.renderSelection()
                    }
                    if (e.args.type != "keyboard" || c.keyboardSelection) {
                        c.renderSelection();
                        c._raiseEvent("2", {
                            index: e.args.index,
                            type: e.args.type,
                            item: e.args.item,
                            originalEvent: e.args.originalEvent
                        });
                        if (e.args.type == "mouse") {
                            if (!c.checkboxes) {
                                c.hideListBox();
                                if (c._firstDiv && c.focusable) {
                                    c._firstDiv.focus()
                                }
                            }
                        }
                    }
                }
            });
            if (this.listBox) {
                if (this.listBox.content) {
                    this.addHandler(this.listBox.content, "click", function(e) {
                        if (!c.disabled) {
                            if (c.listBox.itemswrapper && e.target === c.listBox.itemswrapper[0]) {
                                return true
                            }
                            c.renderSelection("mouse");
                            if (!c.touch) {
                                if (!c.ishiding) {
                                    if (!c.checkboxes) {
                                        c.hideListBox();
                                        if (c._firstDiv && c.focusable) {
                                            c._firstDiv.focus()
                                        }
                                    }
                                }
                            }
                            if (!c.keyboardSelection) {
                                if (c._kbnavigated === false) {
                                    if (c.tempSelectedIndex != c.selectedIndex) {
                                        c._raiseEvent("4", {
                                            index: c.selectedIndex,
                                            type: "mouse",
                                            item: c.getItem(c.selectedIndex)
                                        })
                                    }
                                    c._kbnavigated = true
                                }
                                if (c._oldSelectedInd == undefined) {
                                    c._oldSelectedIndx = c.selectedIndex
                                }
                                if (c.selectedIndex != c._oldSelectedIndx) {
                                    c._raiseEvent("2", {
                                        index: c.selectedIndex,
                                        type: "keyboard",
                                        item: c.getItem(c.selectedIndex)
                                    });
                                    c._oldSelectedIndx = c.selectedIndex
                                }
                            }
                        }
                    })
                }
            }
            this.addHandler(this.host, "focus", function(e) {
                if (c.renderMode !== "simple") {
                    c.host.addClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));
                    c.host.addClass(c.toThemeProperty("jqx-fill-state-focus"))
                }
            });
            this.addHandler(this.host, "blur", function() {
                if (c.renderMode !== "simple") {
                    c.host.removeClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));
                    c.host.removeClass(c.toThemeProperty("jqx-fill-state-focus"))
                }
            });
            this.addHandler(this._firstDiv, "focus", function(e) {
                if (c.renderMode !== "simple") {
                    c.host.addClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));
                    c.host.addClass(c.toThemeProperty("jqx-fill-state-focus"))
                }
            });
            this.addHandler(this._firstDiv, "blur", function() {
                if (c.renderMode !== "simple") {
                    c.host.removeClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));
                    c.host.removeClass(c.toThemeProperty("jqx-fill-state-focus"))
                }
            })
        },
        removeHandlers: function() {
            var c = this;
            var b = "mousedown";
            if (this.touch) {
                b = a.jqx.mobile.getTouchEventName("touchstart")
            }
            this.removeHandler(this.dropdownlistWrapper, b);
            if (this.listBox) {
                if (this.listBox.content) {
                    this.removeHandler(this.listBox.content, "click")
                }
            }
            this.removeHandler(this.host, "loadContent");
            this.removeHandler(this.listBoxContainer, "checkChange");
            this.removeHandler(this.host, "keydown");
            this.removeHandler(this.host, "focus");
            this.removeHandler(this.host, "blur");
            this.removeHandler(this._firstDiv, "focus");
            this.removeHandler(this._firstDiv, "blur");
            this.removeHandler(this.host, "mouseenter");
            this.removeHandler(this.host, "mouseleave");
            this.removeHandler(a(document), "mousemove." + c.id)
        },
        getItem: function(b) {
            var c = this.listBox.getItem(b);
            return c
        },
        getItemByValue: function(c) {
            var b = this.listBox.getItemByValue(c);
            return b
        },
        selectItem: function(b) {
            if (this.listBox != undefined) {
                this.listBox.selectItem(b);
                this.selectedIndex = this.listBox.selectedIndex;
                this.renderSelection("mouse")
            }
        },
        unselectItem: function(b) {
            if (this.listBox != undefined) {
                this.listBox.unselectItem(b);
                this.renderSelection("mouse")
            }
        },
        checkItem: function(b) {
            if (this.listBox != undefined) {
                this.listBox.checkItem(b)
            }
        },
        uncheckItem: function(b) {
            if (this.listBox != undefined) {
                this.listBox.uncheckItem(b)
            }
        },
        indeterminateItem: function(b) {
            if (this.listBox != undefined) {
                this.listBox.indeterminateItem(b)
            }
        },
        renderSelection: function() {
            if (this.listBox == null) {
                return
            }
            if (this.height && this.height.toString().indexOf("%") != -1) {
                this._arrange()
            }
            var r = this.listBox.visibleItems[this.listBox.selectedIndex];
            if (this.filterable) {
                if (this.listBox.selectedIndex == -1) {
                    for (var e in this.listBox.selectedValues) {
                        var l = this.listBox.selectedValues[e];
                        var b = this.listBox.getItemByValue(l);
                        if (b) {
                            r = b
                        }
                    }
                }
            }
            var u = this;
            if (this.checkboxes) {
                var v = this.getCheckedItems();
                if (v != null && v.length > 0) {
                    r = v[0]
                } else {
                    r = null
                }
            }
            if (r == null) {
                var j = a('<span unselectable="on" style="color: inherit; border: none; background-color: transparent;"></span>');
                j.appendTo(a(document.body));
                j.addClass(this.toThemeProperty("jqx-widget"));
                j.addClass(this.toThemeProperty("jqx-listitem-state-normal"));
                j.addClass(this.toThemeProperty("jqx-item"));
                a.jqx.utilities.html(j, this.placeHolder);
                var s = this.dropdownlistContent.css("padding-top");
                var x = this.dropdownlistContent.css("padding-bottom");
                j.css("padding-top", s);
                j.css("padding-bottom", x);
                var q = j.outerHeight();
                j.remove();
                j.removeClass();
                a.jqx.utilities.html(this.dropdownlistContent, j);
                var h = this.host.height();
                if (this.height != null && this.height != undefined) {
                    if (this.height.toString().indexOf("%") === -1) {
                        h = parseInt(this.height)
                    }
                }
                var f = parseInt((parseInt(h) - parseInt(q)) / 2);
                if (f > 0) {
                    this.dropdownlistContent.css("margin-top", f + "px");
                    this.dropdownlistContent.css("margin-bottom", f + "px")
                }
                if (this.selectionRenderer) {
                    a.jqx.utilities.html(this.dropdownlistContent, this.selectionRenderer(j, -1, "", ""));
                    this.dropdownlistContent.css("margin-top", "0px");
                    this.dropdownlistContent.css("margin-bottom", "0px");
                    this._updateInputSelection()
                } else {
                    this._updateInputSelection()
                }
                this.selectedIndex = this.listBox.selectedIndex;
                if (this.width === "auto") {
                    this._arrange()
                }
                if (this.focusable && this.isOpened()) {
                    this.focus()
                }
                return
            }
            this.selectedIndex = this.listBox.selectedIndex;
            var j = a(document.createElement("span"));
            j[0].setAttribute("unselectable", "on");
            try {
                j[0].style.color = "inherit"
            } catch (t) {}
            j[0].style.borderWidth = "0px";
            j[0].style.backgroundColor = "transparent";
            j.appendTo(a(document.body));
            j.addClass(this.toThemeProperty("jqx-widget jqx-listitem-state-normal jqx-item"));
            var p = false;
            try {
                if (r.html != undefined && r.html != null && r.html.toString().length > 0) {
                    a.jqx.utilities.html(j, r.html)
                } else {
                    if (r.label != undefined && r.label != null && r.label.toString().length > 0) {
                        a.jqx.utilities.html(j, r.label)
                    } else {
                        if (r.label === null || r.label === "") {
                            p = true;
                            a.jqx.utilities.html(j, "")
                        } else {
                            if (r.value != undefined && r.value != null && r.value.toString().length > 0) {
                                a.jqx.utilities.html(j, r.value)
                            } else {
                                if (r.title != undefined && r.title != null && r.title.toString().length > 0) {
                                    a.jqx.utilities.html(j, r.title)
                                } else {
                                    if (r.label == "" || r.label == null) {
                                        p = true;
                                        a.jqx.utilities.html(j, "")
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (n) {
                var m = n
            }
            var s = this.dropdownlistContent[0].style.paddingTop;
            var x = this.dropdownlistContent[0].style.paddingBottom;
            if (s === "") {
                s = "0px"
            }
            if (x === "") {
                x = "0px"
            }
            j[0].style.paddingTop = s;
            j[0].style.paddingBottom = x;
            var q = j.outerHeight();
            if (q === 0) {
                q = 16
            }
            if ((r.label == "" || r.label == null) && p) {
                a.jqx.utilities.html(j, "")
            }
            var c = this.width && this.width.toString().indexOf("%") <= 0;
            j.remove();
            j.removeClass();
            if (this.selectionRenderer) {
                a.jqx.utilities.html(this.dropdownlistContent, this.selectionRenderer(j, r.index, r.label, r.value));
                if (this.focusable && this.isOpened()) {
                    this.focus()
                }
            } else {
                if (this.checkboxes) {
                    var g = this.getCheckedItems();
                    var k = "";
                    for (var o = 0; o < g.length; o++) {
                        if (o == g.length - 1) {
                            k += g[o].label
                        } else {
                            k += g[o].label + ","
                        }
                    }
                    j.text(k);
                    if (c) {
                        j.css("max-width", this.host.width() - 30)
                    }
                    j.css("overflow", "hidden");
                    j.css("display", "block");
                    if (!this.rtl) {
                        if (c) {
                            j.css("width", this.host.width() - 30)
                        }
                    }
                    j.css("text-overflow", "ellipsis");
                    j.css("padding-bottom", 1 + parseInt(x));
                    this.dropdownlistContent.html(j);
                    if (this.focusable && this.isOpened()) {
                        this.focus()
                    }
                } else {
                    var d = this.host.width() - this.arrowSize - 3;
                    if (this.width && this.width !== "auto") {
                        if (c) {
                            if (!this.rtl) {
                                j.css("max-width", d + "px")
                            }
                        }
                        j[0].style.overflow = "hidden";
                        j[0].style.display = "block";
                        j[0].style.paddingTop = (1 + parseInt(x)) + "px";
                        if (!this.rtl) {
                            if (c) {
                                if (d < 0) {
                                    d = 0
                                }
                                j[0].style.width = d + "px"
                            }
                        }
                        j[0].style.textOverflow = "ellipsis"
                    }
                    this.dropdownlistContent[0].innerHTML = j[0].innerHTML;
                    if (this.focusable && this.isOpened()) {
                        this.focus()
                    }
                }
            }
            var h = this.host.height();
            if (this.height != null && this.height != undefined) {
                if (this.height.toString().indexOf("%") === -1) {
                    h = parseInt(this.height)
                }
            }
            var f = parseInt((parseInt(h) - parseInt(q)) / 2);
            if (f >= 0) {
                this.dropdownlistContent[0].style.marginTop = f + "px";
                this.dropdownlistContent[0].style.marginBottom = f + "px"
            }
            if (this.selectionRenderer) {
                this.dropdownlistContent[0].style.marginTop = "0px";
                this.dropdownlistContent[0].style.marginBottom = "0px"
            }
            if (this.dropdownlistContent && this.input) {
                this._updateInputSelection()
            }
            if (this.listBox && this.listBox._activeElement) {
                a.jqx.aria(this, "aria-activedescendant", this.listBox._activeElement.id)
            }
            if (this.width === "auto") {
                this._arrange()
            }
        },
        _updateInputSelection: function() {
            if (this.input) {
                var c = new Array();
                if (this.selectedIndex == -1) {
                    this.input.val("")
                } else {
                    var f = this.getSelectedItem();
                    if (f != null) {
                        this.input.val(f.value);
                        c.push(f.value)
                    } else {
                        this.input.val(this.dropdownlistContent.text())
                    }
                }
                if (this.checkboxes) {
                    var b = this.getCheckedItems();
                    var g = "";
                    if (b != null) {
                        for (var d = 0; d < b.length; d++) {
                            var e = b[d].value;
                            if (e == undefined) {
                                continue
                            }
                            if (d == b.length - 1) {
                                g += e
                            } else {
                                g += e + ","
                            }
                            c.push(e)
                        }
                    }
                    this.input.val(g)
                }
            }
            if (this.field && this.input) {
                if (this.field.nodeName.toLowerCase() == "select") {
                    a.each(this.field, function(h, i) {
                        a(this).removeAttr("selected");
                        this.selected = c.indexOf(this.value) >= 0;
                        if (this.selected) {
                            a(this).attr("selected", true)
                        }
                    })
                } else {
                    a.each(this.items, function(h, i) {
                        a(this.originalItem.originalItem).removeAttr("data-selected");
                        this.selected = c.indexOf(this.value) >= 0;
                        if (this.selected) {
                            a(this.originalItem.originalItem).attr("data-selected", true)
                        }
                    })
                }
            }
        },
        setContent: function(b) {
            a.jqx.utilities.html(this.dropdownlistContent, b);
            this._updateInputSelection()
        },
        dataBind: function() {
            this.listBoxContainer.jqxListBox({
                source: this.source
            });
            this.renderSelection("mouse");
            if (this.source == null) {
                this.clearSelection()
            }
        },
        clear: function() {
            this.listBoxContainer.jqxListBox({
                source: null
            });
            this.clearSelection()
        },
        clearSelection: function(b) {
            this.selectedIndex = -1;
            this._updateInputSelection();
            this.listBox.clearSelection();
            this.renderSelection();
            if (!this.selectionRenderer) {
                a.jqx.utilities.html(this.dropdownlistContent, this.placeHolder)
            }
        },
        unselectIndex: function(b, c) {
            if (isNaN(b)) {
                return
            }
            this.listBox.unselectIndex(b, c);
            this.renderSelection()
        },
        selectIndex: function(b, d, e, c) {
            this.listBox.selectIndex(b, d, e, c, "api")
        },
        getSelectedIndex: function() {
            return this.selectedIndex
        },
        getSelectedItem: function() {
            return this.listBox.getVisibleItem(this.selectedIndex)
        },
        getCheckedItems: function() {
            return this.listBox.getCheckedItems()
        },
        checkIndex: function(b) {
            this.listBox.checkIndex(b)
        },
        uncheckIndex: function(b) {
            this.listBox.uncheckIndex(b)
        },
        indeterminateIndex: function(b) {
            this.listBox.indeterminateIndex(b)
        },
        checkAll: function() {
            this.listBox.checkAll();
            this.renderSelection("mouse")
        },
        uncheckAll: function() {
            this.listBox.uncheckAll();
            this.renderSelection("mouse")
        },
        addItem: function(b) {
            return this.listBox.addItem(b)
        },
        insertAt: function(c, b) {
            if (c == null) {
                return false
            }
            return this.listBox.insertAt(c, b)
        },
        removeAt: function(c) {
            var b = this.listBox.removeAt(c);
            this.renderSelection("mouse");
            return b
        },
        removeItem: function(c) {
            var b = this.listBox.removeItem(c);
            this.renderSelection("mouse");
            return b
        },
        updateItem: function(c, d) {
            var b = this.listBox.updateItem(c, d);
            this.renderSelection("mouse");
            return b
        },
        updateAt: function(d, c) {
            var b = this.listBox.updateAt(d, c);
            this.renderSelection("mouse");
            return b
        },
        ensureVisible: function(b) {
            return this.listBox.ensureVisible(b)
        },
        disableAt: function(b) {
            return this.listBox.disableAt(b)
        },
        enableAt: function(b) {
            return this.listBox.enableAt(b)
        },
        disableItem: function(b) {
            return this.listBox.disableItem(b)
        },
        enableItem: function(b) {
            return this.listBox.enableItem(b)
        },
        _findPos: function(c) {
            while (c && (c.type == "hidden" || c.nodeType != 1 || a.expr.filters.hidden(c))) {
                c = c.nextSibling
            }
            var b = a(c).coord(true);
            return [b.left, b.top]
        },
        testOffset: function(h, f, c) {
            var g = h.outerWidth();
            var j = h.outerHeight();
            var i = a(window).width() + a(window).scrollLeft();
            var e = a(window).height() + a(window).scrollTop();
            if (f.left + g > i) {
                if (g > this.host.width()) {
                    var d = this.host.coord().left;
                    var b = g - this.host.width();
                    f.left = d - b + 2
                }
            }
            if (f.left < 0) {
                f.left = parseInt(this.host.coord().left) + "px"
            }
            f.top -= Math.min(f.top, (f.top + j > e && e > j) ? Math.abs(j + c + 22) : 0);
            return f
        },
        open: function() {
            this.showListBox()
        },
        close: function() {
            this.hideListBox()
        },
        _getBodyOffset: function() {
            var c = 0;
            var b = 0;
            if (a("body").css("border-top-width") != "0px") {
                c = parseInt(a("body").css("border-top-width"));
                if (isNaN(c)) {
                    c = 0
                }
            }
            if (a("body").css("border-left-width") != "0px") {
                b = parseInt(a("body").css("border-left-width"));
                if (isNaN(b)) {
                    b = 0
                }
            }
            return {
                left: b,
                top: c
            }
        },
        showListBox: function() {
            a.jqx.aria(this, "aria-expanded", true);
            if (this.listBox._renderOnDemand) {
                this.listBoxContainer.jqxListBox({
                    _renderOnDemand: false
                })
            }
            if (this.dropDownWidth == "auto" && this.width != null && this.width.indexOf && (this.width.indexOf("%") != -1 || this.width.indexOf("auto") != -1)) {
                if (this.listBox.host.width() != this.host.width()) {
                    var p = this.host.width();
                    this.listBoxContainer.jqxListBox({
                        width: p
                    });
                    this.container.width(parseInt(p) + 25)
                }
            }
            var n = this;
            var g = this.listBoxContainer;
            var u = this.listBox;
            var e = a(window).scrollTop();
            var f = a(window).scrollLeft();
            var l = parseInt(this._findPos(this.host[0])[1]) + parseInt(this.host.outerHeight()) - 1 + "px";
            var d, o = parseInt(Math.round(this.host.coord(true).left));
            d = o + "px";
            if (this.dropDownContainer === "element") {
                l = parseInt(this.host.outerHeight()) - 1 + "px";
                d = 0
            }
            var s = a.jqx.mobile.isSafariMobileBrowser() || a.jqx.mobile.isWindowsPhone();
            if (this.listBox == null) {
                return
            }
            this.ishiding = false;
            if (!this.keyboardSelection) {
                this.listBox.selectIndex(this.selectedIndex);
                this.listBox.ensureVisible(this.selectedIndex)
            }
            this.tempSelectedIndex = this.selectedIndex;
            if (this.autoDropDownHeight) {
                this.container.height(this.listBoxContainer.height() + 25)
            }
            if ((s != null && s)) {
                d = a.jqx.mobile.getLeftPos(this.element);
                l = a.jqx.mobile.getTopPos(this.element) + parseInt(this.host.outerHeight());
                if (a("body").css("border-top-width") != "0px") {
                    l = parseInt(l) - this._getBodyOffset().top + "px"
                }
                if (a("body").css("border-left-width") != "0px") {
                    d = parseInt(d) - this._getBodyOffset().left + "px"
                }
            }
            g.stop();
            if (this.renderMode !== "simple") {
                this.host.addClass(this.toThemeProperty("jqx-dropdownlist-state-selected"));
                this.host.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
                if (this.dropDownVerticalAlignment == "top") {
                    this.arrow.addClass(this.toThemeProperty("jqx-icon-arrow-up-selected"))
                } else {
                    this.arrow.addClass(this.toThemeProperty("jqx-icon-arrow-down-selected"))
                }
            }
            this.container.css("left", d);
            this.container.css("top", l);
            u._arrange();
            var c = true;
            var b = false;
            if (this.dropDownHorizontalAlignment == "right" || this.rtl) {
                var i = this.container.outerWidth();
                var q = Math.abs(i - this.host.width());
                if (i > this.host.width()) {
                    this.container.css("left", 25 + parseInt(Math.round(o)) - q + "px")
                } else {
                    this.container.css("left", 25 + parseInt(Math.round(o)) + q + "px")
                }
            }
            if (this.dropDownVerticalAlignment == "top") {
                var r = g.height();
                b = true;
                g.css("top", 23);
                g.addClass(this.toThemeProperty("jqx-popup-up"));
                var k = parseInt(this.host.outerHeight());
                var j = parseInt(l) - Math.abs(r + k + 23);
                this.container.css("top", j)
            }
            if (this.enableBrowserBoundsDetection) {
                var h = this.testOffset(g, {
                    left: parseInt(this.container.css("left")),
                    top: parseInt(l)
                }, parseInt(this.host.outerHeight()));
                if (parseInt(this.container.css("top")) != h.top) {
                    b = true;
                    g.css("top", 23);
                    g.addClass(this.toThemeProperty("jqx-popup-up"))
                } else {
                    g.css("top", 0)
                }
                this.container.css("top", h.top);
                if (parseInt(this.container.css("left")) != h.left) {
                    this.container.css("left", h.left)
                }
            }
            if (this.animationType == "none") {
                this.container.css("display", "block");
                a.data(document.body, "openedJQXListBoxParent", n);
                a.data(document.body, "openedJQXListBox" + this.id, g);
                g.css("margin-top", 0);
                g.css("opacity", 1);
                u._renderItems();
                n._raiseEvent("0", u)
            } else {
                this.container.css("display", "block");
                n.isanimating = true;
                if (this.animationType == "fade") {
                    g.css("margin-top", 0);
                    g.css("opacity", 0);
                    g.animate({
                        opacity: 1
                    }, this.openDelay, function() {
                        a.data(document.body, "openedJQXListBoxParent", n);
                        a.data(document.body, "openedJQXListBox" + n.id, g);
                        n.ishiding = false;
                        n.isanimating = false;
                        u._renderItems();
                        n._raiseEvent("0", u)
                    })
                } else {
                    g.css("opacity", 1);
                    var m = g.outerHeight();
                    if (b) {
                        g.css("margin-top", m)
                    } else {
                        g.css("margin-top", -m)
                    }
                    g.animate({
                        "margin-top": 0
                    }, this.openDelay, function() {
                        a.data(document.body, "openedJQXListBoxParent", n);
                        a.data(document.body, "openedJQXListBox" + n.id, g);
                        n.ishiding = false;
                        n.isanimating = false;
                        u._renderItems();
                        n._raiseEvent("0", u)
                    })
                }
            }
            if (!b) {
                this.host.addClass(this.toThemeProperty("jqx-rc-b-expanded"));
                g.addClass(this.toThemeProperty("jqx-rc-t-expanded"))
            } else {
                this.host.addClass(this.toThemeProperty("jqx-rc-t-expanded"));
                g.addClass(this.toThemeProperty("jqx-rc-b-expanded"))
            }
            if (this.renderMode !== "simple") {
                g.addClass(this.toThemeProperty("jqx-fill-state-focus"));
                this.host.addClass(this.toThemeProperty("jqx-dropdownlist-state-focus"));
                this.host.addClass(this.toThemeProperty("jqx-fill-state-focus"))
            }
        },
        hideListBox: function() {
            a.jqx.aria(this, "aria-expanded", false);
            var f = this.listBoxContainer;
            var g = this.listBox;
            var c = this.container;
            var d = this;
            a.data(document.body, "openedJQXListBox" + this.id, null);
            if (this.animationType == "none") {
                this.container.css("display", "none")
            } else {
                if (!d.ishiding) {
                    f.stop();
                    var b = f.outerHeight();
                    f.css("margin-top", 0);
                    d.isanimating = true;
                    var e = -b;
                    if (parseInt(this.container.coord().top) < parseInt(this.host.coord().top)) {
                        e = b
                    }
                    if (this.animationType == "fade") {
                        f.css({
                            opacity: 1
                        });
                        f.animate({
                            opacity: 0
                        }, this.closeDelay, function() {
                            c.css("display", "none");
                            d.isanimating = false;
                            d.ishiding = false
                        })
                    } else {
                        f.animate({
                            "margin-top": e
                        }, this.closeDelay, function() {
                            c.css("display", "none");
                            d.isanimating = false;
                            d.ishiding = false
                        })
                    }
                }
            }
            this.ishiding = true;
            this.host.removeClass(this.toThemeProperty("jqx-dropdownlist-state-selected"));
            this.host.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
            this.arrow.removeClass(this.toThemeProperty("jqx-icon-arrow-down-selected"));
            this.arrow.removeClass(this.toThemeProperty("jqx-icon-arrow-up-selected"));
            this.host.removeClass(this.toThemeProperty("jqx-rc-b-expanded"));
            f.removeClass(this.toThemeProperty("jqx-rc-t-expanded"));
            this.host.removeClass(this.toThemeProperty("jqx-rc-t-expanded"));
            f.removeClass(this.toThemeProperty("jqx-rc-b-expanded"));
            f.removeClass(this.toThemeProperty("jqx-fill-state-focus"));
            this.host.removeClass(this.toThemeProperty("jqx-dropdownlist-state-focus"));
            this.host.removeClass(this.toThemeProperty("jqx-fill-state-focus"));
            this._raiseEvent("1", g)
        },
        closeOpenedListBox: function(e) {
            var d = e.data.me;
            var b = a(e.target);
            var c = e.data.listbox;
            if (c == null) {
                return true
            }
            if (a(e.target).ischildof(e.data.me.host)) {
                return true
            }
            if (!d.isOpened()) {
                return true
            }
            if (a(e.target).ischildof(d.listBoxContainer)) {
                return true
            }
            var f = d;
            var g = false;
            a.each(b.parents(), function() {
                if (this.className != "undefined") {
                    if (this.className.indexOf) {
                        if (this.className.indexOf("jqx-listbox") != -1) {
                            g = true;
                            return false
                        }
                        if (this.className.indexOf("jqx-dropdownlist") != -1) {
                            if (d.element.id == this.id) {
                                g = true
                            }
                            return false
                        }
                    }
                }
            });
            if (c != null && !g && d.isOpened()) {
                d.hideListBox()
            }
            return true
        },
        clearFilter: function() {
            this.listBox.clearFilter()
        },
        loadFromSelect: function(b) {
            this.listBox.loadFromSelect(b)
        },
        refresh: function(b) {
            if (b !== true) {
                this._setSize();
                this._arrange();
                if (this.listBox) {
                    this.renderSelection()
                }
            }
        },
        _arrange: function() {
            var h = this;
            var d = parseInt(h.host.width());
            var j = parseInt(h.host.height());
            var f = h.arrowSize;
            var g = h.arrowSize;
            var i = 3;
            var b = d - g - 2 * i;
            if (b > 0 && h.width !== "auto") {
                h.dropdownlistContent[0].style.width = b + "px"
            } else {
                if (b <= 0) {
                    h.dropdownlistContent[0].style.width = "0px"
                }
            }
            if (h.width === "auto") {
                h.dropdownlistContent.css("width", "auto");
                d = h.dropdownlistContent.width() + g + 2 * i;
                h.host.width(d)
            }
            h.dropdownlistContent[0].style.height = j + "px";
            h.dropdownlistContent[0].style.left = "0px";
            h.dropdownlistContent[0].style.top = "0px";
            h.dropdownlistArrow[0].style.width = g + "px";
            if (h.width && h.width.toString().indexOf("%") >= 0) {
                var e = (g * 100) / d;
                var c = (b * 100) / d;
                h.dropdownlistArrow[0].style.width = e + "%";
                h.dropdownlistContent[0].style.width = c + "%"
            }
            h.dropdownlistArrow[0].style.height = j + "px";
            if (h.rtl) {
                h.dropdownlistArrow.css("float", "left");
                h.dropdownlistContent.css("float", "right")
            }
        },
        destroy: function() {
            a.jqx.utilities.resize(this.host, null, true);
            this.removeHandler(this.listBoxContainer, "select");
            this.removeHandler(this.listBoxContainer, "unselect");
            this.removeHandler(this.listBoxContainer, "change");
            this.removeHandler(this.dropdownlistWrapper, "selectstart");
            this.removeHandler(this.dropdownlistWrapper, "mousedown");
            this.removeHandler(this.host, "keydown");
            this.removeHandler(this.listBoxContainer, "select");
            this.removeHandler(this.listBox.content, "click");
            this.removeHandler(this.listBoxContainer, "bindingComplete");
            if (this.host.parents()) {
                this.removeHandler(this.host.parents(), "scroll.dropdownlist" + this.element.id)
            }
            this.removeHandlers();
            this.listBoxContainer.jqxListBox("destroy");
            this.listBoxContainer.remove();
            this.host.removeClass();
            this.removeHandler(a(document), "mousedown." + this.id, this.closeOpenedListBox);
            if (this.touch) {
                this.removeHandler(a(document), a.jqx.mobile.getTouchEventName("touchstart") + "." + this.id)
            }
            this.dropdownlistArrow.remove();
            delete this.dropdownlistArrow;
            delete this.dropdownlistWrapper;
            delete this.listBoxContainer;
            delete this.input;
            delete this.arrow;
            delete this.dropdownlistContent;
            delete this.listBox;
            delete this._firstDiv;
            this.container.remove();
            delete this.container;
            var b = a.data(this.element, "jqxDropDownList");
            if (b) {
                delete b.instance
            }
            this.host.removeData();
            this.host.remove();
            delete this.comboStructure;
            delete this.host;
            delete this.element
        },
        _raiseEvent: function(f, c) {
            if (c == undefined) {
                c = {
                    owner: null
                }
            }
            var d = this.events[f];
            args = c;
            args.owner = this;
            var e = new a.Event(d);
            e.owner = this;
            if (f == 2 || f == 3 || f == 4 || f == 5 || f == 6 || f == 7 || f == 8 || f == 9) {
                e.args = c
            }
            var b = this.host.trigger(e);
            return b
        },
        propertiesChangedHandler: function(b, c, e) {
            if (e.width && e.height && Object.keys(e).length == 2) {
                b._setSize();
                if (c == "width") {
                    if (b.dropDownWidth == "auto") {
                        var d = b.host.width();
                        b.listBoxContainer.jqxListBox({
                            width: d
                        });
                        b.container.width(parseInt(d) + 25)
                    }
                }
                b._arrange();
                b.close()
            }
        },
        propertyChangedHandler: function(b, c, f, e) {
            if (b.isInitialized == undefined || b.isInitialized == false) {
                return
            }
            if (b.batchUpdate && b.batchUpdate.width && b.batchUpdate.height && Object.keys(b.batchUpdate).length == 2) {
                return
            }
            if (c == "template") {
                b.listBoxContainer.removeClass(b.toThemeProperty("jqx-" + f + "-item"));
                b.listBoxContainer.addClass(b.toThemeProperty("jqx-" + b.template + "-item"));
                b.host.removeClass(b.toThemeProperty("jqx-" + f + ""));
                b.host.addClass(b.toThemeProperty("jqx-" + b.template + ""))
            }
            if (c == "dropDownVerticalAlignment") {
                b.arrow.removeClass(b.toThemeProperty("jqx-icon-arrow-up"));
                b.arrow.removeClass(b.toThemeProperty("jqx-icon-arrow-down"));
                if (b.dropDownVerticalAlignment == "top") {
                    b.arrow.addClass(b.toThemeProperty("jqx-icon-arrow-up"))
                } else {
                    b.arrow.addClass(b.toThemeProperty("jqx-icon-arrow-down"))
                }
                b.listBoxContainer.css("top", 0);
                b.listBoxContainer.removeClass(this.toThemeProperty("jqx-popup-up"))
            }
            if (c == "autoItemsHeight") {
                b.listBoxContainer.jqxListBox({
                    autoItemsHeight: e
                })
            }
            if (c == "filterable") {
                b.listBoxContainer.jqxListBox({
                    filterable: e
                })
            }
            if (c == "filterHeight") {
                b.listBoxContainer.jqxListBox({
                    filterHeight: e
                })
            }
            if (c == "filterPlaceHolder") {
                b.listBoxContainer.jqxListBox({
                    filterPlaceHolder: e
                })
            }
            if (c == "filterDelay") {
                b.listBoxContainer.jqxListBox({
                    filterDelay: e
                })
            }
            if (c == "enableSelection") {
                b.listBoxContainer.jqxListBox({
                    enableSelection: e
                })
            }
            if (c == "enableHover") {
                b.listBoxContainer.jqxListBox({
                    enableHover: e
                })
            }
            if (c == "autoOpen") {
                b._updateHandlers()
            }
            if (c == "emptyString") {
                b.listBox.emptyString = b.emptyString
            }
            if (c == "itemHeight") {
                b.listBoxContainer.jqxListBox({
                    itemHeight: e
                })
            }
            if (c == "renderer") {
                b.listBoxContainer.jqxListBox({
                    renderer: e
                })
            }
            if (c == "rtl") {
                if (e) {
                    b.dropdownlistArrow.css("float", "left");
                    b.dropdownlistContent.css("float", "right")
                } else {
                    b.dropdownlistArrow.css("float", "right");
                    b.dropdownlistContent.css("float", "left")
                }
                b.listBoxContainer.jqxListBox({
                    rtl: b.rtl
                })
            }
            if (c == "source") {
                b.listBoxContainer.jqxListBox({
                    source: b.source
                });
                b.listBox.selectedIndex = -1;
                b.listBox.selectIndex(this.selectedIndex);
                b.renderSelection();
                if (e == null) {
                    b.clear()
                }
            }
            if (c == "displayMember" || c == "valueMember") {
                b.listBoxContainer.jqxListBox({
                    displayMember: b.displayMember,
                    valueMember: b.valueMember
                });
                b.renderSelection()
            }
            if (c == "placeHolder") {
                b.renderSelection()
            }
            if (c == "theme" && e != null) {
                b.listBoxContainer.jqxListBox({
                    theme: e
                });
                b.listBoxContainer.addClass(b.toThemeProperty("jqx-popup"));
                a.jqx.utilities.setTheme(f, e, b.host)
            }
            if (c == "autoDropDownHeight") {
                b.listBoxContainer.jqxListBox({
                    autoHeight: b.autoDropDownHeight
                });
                if (b.autoDropDownHeight) {
                    b.container.height(b.listBoxContainer.height() + 25)
                } else {
                    b.listBoxContainer.jqxListBox({
                        height: b.dropDownHeight
                    });
                    b.container.height(parseInt(b.dropDownHeight) + 25)
                }
                b.listBox._arrange();
                b.listBox._updatescrollbars()
            }
            if (c == "searchMode") {
                b.listBoxContainer.jqxListBox({
                    searchMode: b.searchMode
                })
            }
            if (c == "incrementalSearch") {
                b.listBoxContainer.jqxListBox({
                    incrementalSearch: b.incrementalSearch
                })
            }
            if (c == "incrementalSearchDelay") {
                b.listBoxContainer.jqxListBox({
                    incrementalSearchDelay: b.incrementalSearchDelay
                })
            }
            if (c == "dropDownHeight") {
                if (!b.autoDropDownHeight) {
                    b.listBoxContainer.jqxListBox({
                        height: b.dropDownHeight
                    });
                    b.container.height(parseInt(b.dropDownHeight) + 25)
                }
            }
            if (c == "dropDownWidth" || c == "scrollBarSize") {
                var d = b.width;
                if (b.dropDownWidth != "auto") {
                    d = b.dropDownWidth
                }
                b.listBoxContainer.jqxListBox({
                    width: d,
                    scrollBarSize: b.scrollBarSize
                });
                b.container.width(parseInt(d) + 25)
            }
            if (c == "width" || c == "height") {
                if (e != f) {
                    this.refresh();
                    if (c == "width") {
                        if (b.dropDownWidth == "auto") {
                            var d = b.host.width();
                            b.listBoxContainer.jqxListBox({
                                width: d
                            });
                            b.container.width(parseInt(d) + 25)
                        }
                    }
                    b.close()
                }
            }
            if (c == "checkboxes") {
                b.listBoxContainer.jqxListBox({
                    checkboxes: b.checkboxes
                })
            }
            if (c == "selectedIndex") {
                if (b.listBox != null) {
                    b.listBox.selectIndex(parseInt(e));
                    b.renderSelection()
                }
            }
        }
    })
}
)(jqxBaseFramework);
