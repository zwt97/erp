/*
jQWidgets v5.5.0 (2017-Dec)
Copyright (c) 2011-2017 jQWidgets.
License: https://jqwidgets.com/license/
*/

(function(a) {
    a.extend(a.jqx._jqxGrid.prototype, {
        _handledblclick: function(t, n) {
            if (t.target == null) {
                return
            }
            if (n.disabled) {
                return
            }
            if (a(t.target).ischildof(this.columnsheader)) {
                return
            }
            var w;
            if (t.which) {
                w = (t.which == 3)
            } else {
                if (t.button) {
                    w = (t.button == 2)
                }
            }
            if (w) {
                return
            }
            var B;
            if (t.which) {
                B = (t.which == 2)
            } else {
                if (t.button) {
                    B = (t.button == 1)
                }
            }
            if (B) {
                return
            }
            var v = this.showheader ? this.columnsheader.height() + 2 : 0;
            var o = this._groupsheader() ? this.groupsheader.height() : 0;
            var A = this.showtoolbar ? this.toolbarheight : 0;
            o += A;
            var e = this.host.offset();
            var m = t.pageX - e.left;
            var l = t.pageY - v - e.top - o;
            var b = this._hittestrow(m, l);
            if (!b) {
                return
            }
            var h = b.row;
            var j = b.index;
            var q = t.target.className;
            var p = this.table[0].rows[j];
            if (p == null) {
                return
            }
            n.mousecaptured = true;
            n.mousecaptureposition = {
                left: t.pageX,
                top: t.pageY - o
            };
            var r = this.hScrollInstance;
            var s = r.value;
            var d = 0;
            var k = this.groupable ? this.groups.length : 0;
            for (var u = 0; u < p.cells.length; u++) {
                var f = parseInt(a(this.columnsrow[0].cells[u]).css("left"));
                var g = f - s;
                if (n.columns.records[u].pinned) {
                    g = f
                }
                var c = this._getcolumnat(u);
                if (c != null && c.hidden) {
                    continue
                }
                var z = g + a(this.columnsrow[0].cells[u]).width();
                if (z >= m && m >= g) {
                    d = u;
                    break
                }
            }
            if (h != null) {
                var c = this._getcolumnat(d);
                if (!(q.indexOf("jqx-grid-group-expand") != -1 || q.indexOf("jqx-grid-group-collapse") != -1)) {
                    if (h.boundindex != -1) {
                        n.begincelledit(n.getboundindex(h), c.datafield, c.defaulteditorvalue)
                    }
                }
            }
        },
        _getpreveditablecolumn: function(c) {
            var b = this;
            while (c > 0) {
                c--;
                var d = b.getcolumnat(c);
                if (!d) {
                    return null
                }
                if (!d.editable) {
                    continue
                }
                if (!d.hidden) {
                    return d
                }
            }
            return null
        },
        _getnexteditablecolumn: function(c) {
            var b = this;
            while (c < this.columns.records.length) {
                c++;
                var d = b.getcolumnat(c);
                if (!d) {
                    return null
                }
                if (!d.editable) {
                    continue
                }
                if (!d.hidden) {
                    return d
                }
            }
            return null
        },
        _handleeditkeydown: function(T, j) {
            if (j.handlekeyboardnavigation) {
                var L = j.handlekeyboardnavigation(T);
                if (L == true) {
                    return true
                }
            }
            var u = T.charCode ? T.charCode : T.keyCode ? T.keyCode : 0;
            j.editEvent = T;
            if (j.showfilterrow && j.filterable) {
                if (this.filterrow) {
                    if (a(T.target).ischildof(this.filterrow)) {
                        return true
                    }
                }
            }
            if (T.target.className && T.target.className.indexOf("jqx-grid-widget") >= 0) {
                return true
            }
            if (j.pageable) {
                if (a(T.target).ischildof(this.pager)) {
                    return true
                }
            }
            if (this.showtoolbar) {
                if (a(T.target).ischildof(this.toolbar)) {
                    return true
                }
            }
            if (this.showeverpresentrow) {
                if (this.addnewrowtop) {
                    if (a(T.target).ischildof(this.addnewrowtop)) {
                        return true
                    }
                }
                if (this.addnewrowbottom) {
                    if (a(T.target).ischildof(this.addnewrowbottom)) {
                        return true
                    }
                }
            }
            if (this.showstatusbar) {
                if (a(T.target).ischildof(this.statusbar)) {
                    return true
                }
            }
            if (this.rowdetails) {
                if (a(T.target).ischildof(this.content.find("[role='rowgroup']"))) {
                    return true
                }
            }
            if (this.editcell) {
                if (this.editmode === "selectedrow") {
                    if (u === 13) {
                        this.endrowedit(this.editcell.row, false);
                        return false
                    } else {
                        if (u === 27) {
                            this.endrowedit(this.editcell.row, true);
                            return false
                        }
                    }
                    if (u == 32) {
                        if (this._currentColumn && this.getcolumn(this._currentColumn).columntype == "checkbox") {
                            var M = this.getcolumn(this._currentColumn);
                            if (M.editable) {
                                var A = !this.getcellvalue(this.editcell.row, M.datafield);
                                var H = this.getrowdata(this.editcell.row);
                                var s = this.editcell.row;
                                var H = j.getrowdata(j.editcell.row);
                                this.setcellvalue(this.editcell.row, M.datafield, A, false);
                                var k = this._focusedColumn;
                                var d = this._currentColumn;
                                var f = this._currentEditableColumn;
                                this.endrowedit(this.editcell.row, false);
                                this.beginrowedit(s, false);
                                this._currentColumn = d;
                                this._focusedColumn = k;
                                this._currentEditableColumn = f;
                                this._renderrows();
                                this.selectcell(s, M.datafield);
                                this._oldselectedcell = this.selectedcell;
                                if (k) {
                                    var G = this;
                                    setTimeout(function() {
                                        G.selectcell(s, M.datafield);
                                        G._oldselectedcell = G.selectedcell;
                                        a(G._checkboxCells[M.datafield].checkbox).jqxCheckBox("focus")
                                    }, 25)
                                }
                                return false
                            }
                        }
                    }
                    if (u === 9) {
                        var K = this.editcell.datafield;
                        var e = this._getcolumnindex(K);
                        if (this._currentEditableColumn) {
                            e = this._currentEditableColumn
                        } else {
                            this._currentEditableColumn = e
                        }
                        var M = this._getnexteditablecolumn(e);
                        if (T.shiftKey) {
                            M = this._getpreveditablecolumn(e)
                        }
                        if (M) {
                            var e = this._getcolumnindex(M.datafield);
                            if (this.editcell[M.datafield]) {
                                this._currentEditableColumn = e;
                                var b = this.editcell[M.datafield].editor;
                                if (b) {
                                    if (b.data().jqxWidget && b.data().jqxWidget.focus) {
                                        b.data().jqxWidget.focus()
                                    } else {
                                        b.focus();
                                        b[0].onkeyup = function() {
                                            if (j.gridcontent[0].scrollTop != 0) {
                                                j.scrolltop(Math.abs(j.gridcontent[0].scrollTop));
                                                j.gridcontent[0].scrollTop = 0
                                            }
                                            if (j.gridcontent[0].scrollLeft != 0) {
                                                j.gridcontent[0].scrollLeft = 0
                                            }
                                        }
                                    }
                                }
                                this._focusedColumn = M.datafield;
                                this._currentColumn = M.datafield;
                                if (this.gridcontent[0].scrollTop != 0) {
                                    this.scrolltop(Math.abs(this.gridcontent[0].scrollTop));
                                    this.gridcontent[0].scrollTop = 0
                                }
                                if (this.gridcontent[0].scrollLeft != 0) {
                                    this.gridcontent[0].scrollLeft = 0
                                }
                            } else {
                                if (M.columntype == "checkbox") {
                                    this._currentColumn = M.datafield;
                                    this._currentEditableColumn = e;
                                    this.selectcell(this.editcell.row, M.datafield);
                                    this._oldselectedcell = this.selectedcell;
                                    if (this._checkboxCells[M.datafield]) {
                                        a(this._checkboxCells[M.datafield].checkbox).jqxCheckBox("focus")
                                    }
                                    return false
                                }
                            }
                        }
                        return false
                    }
                    return true
                }
                if (this.editcell.columntype == null || this.editcell.columntype == "textbox" || this.editcell.columntype == "numberinput" || this.editcell.columntype == "combobox" || this.editcell.columntype == "datetimeinput") {
                    if (u >= 33 && u <= 40 && j.selectionmode == "multiplecellsadvanced") {
                        var b = this.editcell.columntype == "textbox" || this.editcell.columntype == null ? this.editcell.editor : this.editcell.editor.find("input");
                        var p = j._selection(b);
                        var J = b.val().length;
                        if (p.length > 0 && this.editcell.columntype != "datetimeinput") {
                            j._cancelkeydown = true
                        }
                        if (p.start > 0 && u == 37) {
                            j._cancelkeydown = true
                        }
                        if (p.start < J && u == 39 && this.editcell.columntype != "datetimeinput") {
                            j._cancelkeydown = true
                        }
                        if (this.editcell.columntype == "datetimeinput" && u == 39) {
                            if (p.start + p.length < J) {
                                j._cancelkeydown = true
                            }
                        }
                    }
                } else {
                    if (this.editcell.columntype == "dropdownlist") {
                        if (u == 37 || u == 39 && j.selectionmode == "multiplecellsadvanced") {
                            j._cancelkeydown = false
                        }
                    } else {
                        if (this.selectionmode == "multiplecellsadvanced" && this.editcell.columntype != "textbox" && this.editcell.columntype != "numberinput") {
                            j._cancelkeydown = true
                        }
                    }
                }
                if (u == 32) {
                    if (j.editcell.columntype == "checkbox") {
                        var M = j.getcolumn(j.editcell.datafield);
                        if (M.editable) {
                            var A = !j.getcellvalue(j.editcell.row, j.editcell.column);
                            if (M.cellbeginedit) {
                                var n = M.cellbeginedit(j.editcell.row, M.datafield, M.columntype, !A);
                                if (n == false) {
                                    return false
                                }
                            }
                            var H = j.getrowdata(j.editcell.row);
                            j.setcellvalue(j.editcell.row, j.editcell.column, A, true);
                            j._raiseEvent(18, {
                                rowindex: j.editcell.row,
                                row: H,
                                datafield: j.editcell.column,
                                oldvalue: !A,
                                value: A,
                                columntype: "checkbox"
                            });
                            return false
                        }
                    }
                }
                if (u == 9) {
                    var l = this.editcell.row;
                    var K = this.editcell.column;
                    var i = K;
                    var e = j._getcolumnindex(K);
                    var D = false;
                    var I = j.getrowvisibleindex(l);
                    var N = l;
                    this.editchar = "";
                    var t = this.editcell.validated;
                    if (!this.editcell.validated) {
                        var t = this.endcelledit(this.editcell.row, this.editcell.column, false, true, false)
                    }
                    if (t != false) {
                        if (T.shiftKey) {
                            var M = j._getpreveditablecolumn(e);
                            if (M) {
                                K = M.datafield;
                                D = true;
                                if (j.selectionmode.indexOf("cell") != -1) {
                                    j.selectprevcell(l, i);
                                    j._oldselectedcell = j.selectedcell;
                                    setTimeout(function() {
                                        j.ensurecellvisible(I, K)
                                    }, 10)
                                }
                            } else {
                                var r = j._getlastvisiblecolumn();
                                D = true;
                                K = r.displayfield;
                                var h = j.getdisplayrows()[I - 1];
                                if (h) {
                                    l = h.dataindex;
                                    if (l === undefined) {
                                        l = h.boundindex
                                    }
                                    I = j.getrowvisibleindex(l)
                                }
                                var y = true;
                                if (j.pageable) {
                                    var Q = Math.floor(I / this.pagesize);
                                    if (this.dataview.pagenum != Q) {
                                        y = false
                                    }
                                }
                                if (y && j.selectionmode.indexOf("cell") != -1) {
                                    j.clearselection();
                                    j.selectcell(l, K);
                                    j._oldselectedcell = j.selectedcell;
                                    setTimeout(function() {
                                        j.ensurecellvisible(I, K)
                                    }, 10)
                                }
                            }
                        } else {
                            var M = j._getnexteditablecolumn(e);
                            if (M) {
                                K = M.datafield;
                                D = true;
                                if (j.selectionmode.indexOf("cell") != -1) {
                                    j.selectnextcell(l, i);
                                    j._oldselectedcell = j.selectedcell;
                                    setTimeout(function() {
                                        j.ensurecellvisible(I, K)
                                    }, 10)
                                }
                            } else {
                                var x = j._getfirstvisiblecolumn();
                                D = true;
                                K = x.displayfield;
                                var h = j.getdisplayrows()[I + 1];
                                if (h) {
                                    l = h.dataindex;
                                    if (l === undefined) {
                                        l = h.boundindex
                                    }
                                    I = j.getrowvisibleindex(l)
                                }
                                var y = true;
                                if (j.pageable) {
                                    var Q = Math.floor(I / this.pagesize);
                                    if (this.dataview.pagenum != Q) {
                                        y = false
                                    }
                                }
                                if (j.selectionmode.indexOf("cell") != -1) {
                                    if (y) {
                                        j.clearselection();
                                        j.selectcell(l, K);
                                        j._oldselectedcell = j.selectedcell;
                                        setTimeout(function() {
                                            j.ensurecellvisible(I, K)
                                        }, 10)
                                    }
                                }
                            }
                        }
                        if (D) {
                            if (j.pageable) {
                                var Q = Math.floor(I / this.pagesize);
                                if (this.dataview.pagenum != Q) {
                                    this._renderrows(this.virtualsizeinfo);
                                    if (j.selectionmode.indexOf("cell") != -1) {
                                        j.clearselection();
                                        j.selectcell(N, i);
                                        j._oldselectedcell = j.selectedcell
                                    }
                                    if (Q > this.dataview.pagenum) {
                                        setTimeout(function() {
                                            j.pagerpageinput.focus()
                                        }, 25)
                                    }
                                    return
                                }
                            }
                            j.begincelledit(l, K);
                            if (this.editcell != null && this.editcell.columntype == "checkbox") {
                                this._renderrows(this.virtualsizeinfo)
                            }
                        } else {
                            if (this.editcell != null) {
                                j.endcelledit(l, K, false);
                                this._renderrows(this.virtualsizeinfo)
                            }
                            return true
                        }
                    }
                    return false
                } else {
                    if (u == 13) {
                        var F = this.selectedcell;
                        if (F) {
                            var z = this.getrowvisibleindex(F.rowindex)
                        }
                        this.endcelledit(this.editcell.row, this.editcell.column, false, true);
                        if (this.selectionmode == "multiplecellsadvanced") {
                            var B = j.getselectedcell();
                            if (B != null) {
                                if (j.selectcell) {
                                    if (this.editcell == null) {
                                        if (B.rowindex + 1 < this.dataview.totalrecords) {
                                            if (this.sortcolumn != B.datafield) {
                                                var I = this.getrowvisibleindex(B.rowindex);
                                                var q = this.dataview.loadedrecords[I + 1];
                                                if (q) {
                                                    if (!this.pageable || (this.pageable && I + 1 < (this.dataview.pagenum + 1) * this.pagesize)) {
                                                        this.clearselection(false);
                                                        this.selectcell(this.getboundindex(q), B.datafield);
                                                        var B = this.getselectedcell();
                                                        this.ensurecellvisible(q.visibleindex, B.datafield)
                                                    }
                                                }
                                            } else {
                                                if (F != null) {
                                                    var S = this.dataview.loadedrecords[z + 1];
                                                    if (S) {
                                                        if (!this.pageable || (this.pageable && z + 1 < this.pagesize)) {
                                                            this.clearselection(false);
                                                            this.selectcell(this.getboundindex(S), B.datafield)
                                                        } else {
                                                            if (this.pageable && z + 1 >= this.pagesize) {
                                                                this.clearselection(false);
                                                                var S = this.dataview.loadedrecords[z];
                                                                this.selectcell(this.getboundindex(S), B.datafield)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return false
                    } else {
                        if (u == 27) {
                            this.endcelledit(this.editcell.row, this.editcell.column, true, true);
                            return false
                        }
                    }
                }
            } else {
                var O = false;
                if (u == 113) {
                    O = true
                }
                if (!T.ctrlKey && !T.altKey && !T.metaKey) {
                    if (u >= 48 && u <= 57) {
                        this.editchar = String.fromCharCode(u);
                        O = true
                    }
                    if (u === 189) {
                        O = true
                    }
                    if (u >= 65 && u <= 90) {
                        this.editchar = String.fromCharCode(u);
                        var o = false;
                        if (T.shiftKey) {
                            o = T.shiftKey
                        } else {
                            if (T.modifiers) {
                                o = !!(T.modifiers & 4)
                            }
                        }
                        if (this._capsLock) {
                            o = !o
                        }
                        if (!o) {
                            this.editchar = this.editchar.toLowerCase()
                        }
                        O = true
                    } else {
                        if (u >= 96 && u <= 105) {
                            this.editchar = u - 96;
                            this.editchar = this.editchar.toString();
                            O = true
                        }
                    }
                    var C = a(".jqx-grid").length;
                    O = O && (C == 1 || (C > 1 && j.focused));
                    var R = a.data(document.body, "jqxgrid.edit");
                    if (R !== undefined && R !== "") {
                        if (u === 13 || O) {
                            if (R != j.element.id) {
                                return true
                            }
                        }
                    }
                }
                if (u == 13 || O) {
                    if (j.getselectedrowindex) {
                        var l = j.getselectedrowindex();
                        if (j.editmode === "selectedrow") {
                            if (l >= 0) {
                                j.beginrowedit(l)
                            } else {
                                var B = j.getselectedcell();
                                if (B != null) {
                                    var M = j._getcolumnbydatafield(B.datafield);
                                    j.beginrowedit(B.rowindex)
                                }
                                return false
                            }
                        }
                        switch (j.selectionmode) {
                        case "singlerow":
                        case "multiplerows":
                        case "multiplerowsextended":
                            if (l >= 0) {
                                var K = "";
                                for (var P = 0; P < j.columns.records.length; P++) {
                                    var M = j.getcolumnat(P);
                                    if (M.editable) {
                                        K = M.datafield;
                                        break
                                    }
                                }
                                if (j.editmode === "selectedrow") {
                                    j.beginrowedit(l)
                                } else {
                                    j.begincelledit(l, K)
                                }
                            }
                            break;
                        case "singlecell":
                        case "multiplecells":
                        case "multiplecellsextended":
                            var B = j.getselectedcell();
                            if (B != null) {
                                var M = j._getcolumnbydatafield(B.datafield);
                                if (j.editmode === "selectedrow") {
                                    j.beginrowedit(B.rowindex)
                                } else {
                                    if (M.columntype != "checkbox") {
                                        j.begincelledit(B.rowindex, B.datafield)
                                    }
                                }
                            }
                            break;
                        case "multiplecellsadvanced":
                            var B = j.getselectedcell();
                            if (B != null) {
                                if (u == 13) {
                                    if (j.selectcell) {
                                        var I = this.getrowvisibleindex(B.rowindex);
                                        if (I + 1 < j.dataview.totalrecords) {
                                            var q = this.dataview.loadedrecords[I + 1];
                                            if (q) {
                                                this.clearselection(false);
                                                this.selectcell(this.getboundindex(q), B.datafield);
                                                var B = this.getselectedcell();
                                                this.ensurecellvisible(q.visibleindex, B.datafield)
                                            }
                                        }
                                    }
                                } else {
                                    if (j.editmode !== "selectedrow") {
                                        j.begincelledit(B.rowindex, B.datafield)
                                    }
                                }
                            }
                            break
                        }
                        return false
                    }
                }
                if (u == 46) {
                    var v = j.getselectedcells();
                    if (j.selectionmode.indexOf("cell") == -1) {
                        if (j._getcellsforcopypaste) {
                            v = j._getcellsforcopypaste()
                        }
                    }
                    if (v != null && v.length > 0) {
                        for (var w = 0; w < v.length; w++) {
                            var B = v[w];
                            if (!B.datafield) {
                                continue
                            }
                            var M = j.getcolumn(B.datafield);
                            var E = j.getcellvalue(B.rowindex, B.datafield);
                            if (E !== "" && M.editable && j.enablekeyboarddelete) {
                                var c = null;
                                if (M.columntype == "checkbox") {
                                    if (!M.threestatecheckbox) {
                                        c = false
                                    }
                                }
                                if (M.cellbeginedit) {
                                    var n = M.cellbeginedit(B.rowindex, M.datafield, M.columntype, c);
                                    if (n == false) {
                                        return false
                                    }
                                }
                                var H = j.getrowdata(B.rowindex);
                                j._raiseEvent(17, {
                                    rowindex: B.rowindex,
                                    row: H,
                                    datafield: B.datafield,
                                    value: E
                                });
                                if (w == v.length - 1) {
                                    j.setcellvalue(B.rowindex, B.datafield, c, true);
                                    if (M.displayfield != M.datafield) {
                                        j.setcellvalue(B.rowindex, M.displayfield, c, true)
                                    }
                                } else {
                                    j.setcellvalue(B.rowindex, B.datafield, c, false);
                                    if (M.displayfield != M.datafield) {
                                        j.setcellvalue(B.rowindex, M.displayfield, c, true)
                                    }
                                }
                                if (M.cellendedit) {
                                    var g = M.cellendedit(B.rowindex, M.datafield, M.columntype, c)
                                }
                                j._raiseEvent(18, {
                                    rowindex: B.rowindex,
                                    row: H,
                                    datafield: B.datafield,
                                    oldvalue: E,
                                    value: c
                                })
                            }
                        }
                        this.dataview.updateview();
                        this._renderrows(this.virtualsizeinfo);
                        return false
                    }
                }
                if (u == 32) {
                    var B = j.getselectedcell();
                    if (B != null) {
                        var M = j.getcolumn(B.datafield);
                        if (M.columntype == "checkbox" && M.editable) {
                            var A = !j.getcellvalue(B.rowindex, B.datafield);
                            if (M.cellbeginedit) {
                                var n = M.cellbeginedit(B.rowindex, M.datafield, M.columntype, !A);
                                if (n == false) {
                                    return false
                                }
                            }
                            var H = j.getrowdata(B.rowindex);
                            j._raiseEvent(17, {
                                rowindex: B.rowindex,
                                row: H,
                                datafield: B.datafield,
                                value: !A,
                                columntype: "checkbox"
                            });
                            j.setcellvalue(B.rowindex, B.datafield, A, true);
                            j._raiseEvent(18, {
                                rowindex: B.rowindex,
                                row: H,
                                datafield: B.datafield,
                                oldvalue: !A,
                                value: A,
                                columntype: "checkbox"
                            });
                            return false
                        }
                    }
                }
            }
            return true
        },
        begincelledit: function(o, e, l, g, c) {
            var f = this.getcolumn(e);
            this._cellscache = new Array();
            if (e == null) {
                return
            }
            if (f.columntype == "number" || f.columntype == "button" || f.createwidget) {
                return
            }
            if (this.groupable) {
                if (this.groups.indexOf(e) >= 0) {
                    return
                }
                if (this.groups.indexOf(f.displayfield) >= 0) {
                    return
                }
            }
            if (this.editrow != undefined) {
                return
            }
            if (this.editcell) {
                if (this.editcell.row == o && this.editcell.column == e) {
                    return true
                }
                if (this.editmode === "selectedrow") {
                    if (this.editcell.row == o) {
                        return
                    }
                }
                var d = this.endcelledit(this.editcell.row, this.editcell.column, false, true, false);
                if (false == d) {
                    return
                }
            }
            var i = f.columntype == "checkbox" || f.columntype == "button" || f.createwidget;
            this.host.removeClass("jqx-disableselect");
            this.content.removeClass("jqx-disableselect");
            if (f.editable) {
                if (f.cellbeginedit) {
                    var k = this.getcell(o, e);
                    var m = f.cellbeginedit(o, e, f.columntype, k != null ? k.value : null);
                    if (m == false) {
                        return
                    }
                }
                var j = this.getrowvisibleindex(o);
                this.editcell = this.getcell(o, e);
                if (this.editcell) {
                    this.editcell.visiblerowindex = j;
                    if (!this.editcell.editing) {
                        if (!i) {
                            this.editcell.editing = true
                        }
                        this.editcell.columntype = f.columntype;
                        this.editcell.defaultvalue = l;
                        if (f.defaultvalue != undefined) {
                            this.editcell.defaultvalue = f.defaultvalue
                        }
                        this.editcell.init = true;
                        if (f.columntype != "checkbox" && this.editmode != "selectedrow") {
                            var h = this.getrowdata(o);
                            this._raiseEvent(17, {
                                rowindex: o,
                                row: h,
                                datafield: f.datafield,
                                value: this.editcell.value,
                                columntype: f.columntype
                            })
                        }
                        a.data(document.body, "jqxgrid.edit", this.element.id);
                        if (!i) {
                            var b = this.getrowvisibleindex(o);
                            if (g !== false) {
                                if (!this.autorowheight) {
                                    var n = this.ensurecellvisible(b, f.datafield)
                                }
                            }
                            if (c !== false) {
                                this._renderrows(this.virtualsizeinfo)
                            }
                        }
                        if (this.editcell) {
                            this.editcell.init = false;
                            return true
                        }
                    }
                }
            } else {
                if (!this.editcell) {
                    return
                }
                this.editcell.editor = null;
                this.editcell.editing = false;
                if (c !== false) {
                    this._renderrows(this.virtualsizeinfo)
                }
                this.editcell = null
            }
        },
        getScrollTop: function() {
            if (this._py) {
                return pageYOffset
            }
            this._py = typeof pageYOffset != "undefined";
            if (this._py) {
                return pageYOffset
            } else {
                var c = document.body;
                var b = document.documentElement;
                b = (b.clientHeight) ? b : c;
                return b.scrollTop
            }
        },
        getScrollLeft: function() {
            if (typeof pageXOffset != "undefined") {
                return pageXOffset
            } else {
                var c = document.body;
                var b = document.documentElement;
                b = (b.clientHeight) ? b : c;
                return b.scrollLeft
            }
        },
        endcelledit: function(h, n, j, e, o) {
            if (h == undefined || n == undefined) {
                if (this.editcell) {
                    h = this.editcell.row;
                    n = this.editcell.column
                }
                if (j == undefined) {
                    j = true
                }
            }
            if (!this.editcell) {
                return
            }
            var d = this.getcolumn(n);
            var u = this;
            if (u.editmode === "selectedrow") {
                this.endrowedit(h, j);
                return
            }
            var t = function() {
                if (o != false) {
                    if (u.isTouchDevice()) {
                        return
                    }
                    if (!u.isNestedGrid) {
                        var v = u.getScrollTop();
                        var x = u.getScrollLeft();
                        try {
                            u.element.focus();
                            u.content.focus();
                            if (v != u.getScrollTop()) {
                                window.scrollTo(x, v)
                            }
                            setTimeout(function() {
                                u.element.focus();
                                u.content.focus();
                                if (v != u.getScrollTop()) {
                                    window.scrollTo(x, v)
                                }
                            }, 10)
                        } catch (w) {}
                    }
                }
            };
            if (d.columntype == "checkbox" || d.columntype == "button" || d.createwidget) {
                if (this.editcell) {
                    this.editcell.editor = null;
                    this.editcell.editing = false;
                    this.editcell = null
                }
                return true
            }
            var i = this._geteditorvalue(d);
            var g = function(w) {
                w._hidecelleditor();
                if (d.cellendedit) {
                    d.cellendedit(h, n, d.columntype, w.editcell.value, i)
                }
                w.editchar = null;
                if (d.displayfield != d.datafield) {
                    var v = w.getcellvalue(w.editcell.row, d.displayfield);
                    var x = w.editcell.value;
                    oldvalue = {
                        value: x,
                        label: v
                    }
                } else {
                    oldvalue = w.editcell.value
                }
                var y = w.getrowdata(h);
                w._raiseEvent(18, {
                    rowindex: h,
                    row: y,
                    datafield: n,
                    displayfield: d.displayfield,
                    oldvalue: i,
                    value: i,
                    columntype: d.columntype
                });
                w.editcell.editor = null;
                w.editcell.editing = false;
                w.editcell = null;
                if (e || e == undefined) {
                    w._renderrows(w.virtualsizeinfo)
                }
                t();
                if (!w.enablebrowserselection) {
                    w.host.addClass("jqx-disableselect");
                    w.content.addClass("jqx-disableselect")
                }
            };
            if (j) {
                g(this);
                return false
            }
            if (this.validationpopup) {
                this.validationpopup.hide();
                this.validationpopuparrow.hide()
            }
            if (d.cellvaluechanging) {
                var b = d.cellvaluechanging(h, n, d.columntype, this.editcell.value, i);
                if (b != undefined) {
                    i = b
                }
            }
            if (d.validation) {//h: index, n: colName
                var c = this.getcell(h, n);
                try {
                    var p = d.validation(c, i);
                    var l = this.gridlocalization.validationstring;
                    if (p.message != undefined) {
                        l = p.message
                    }
                    var m = typeof p == "boolean" ? p : p.result;
                    if (!m) {
                        if (p.showmessage == undefined || p.showmessage == true) {
                            this._showvalidationpopup(h, n, l)
                        }
                        this.editcell.validated = false;
                        return false
                    }
                } catch (r) {
                    this._showvalidationpopup(h, n, this.gridlocalization.validationstring);
                    this.editcell.validated = false;
                    return false
                }
            }
            if (d.displayfield != d.datafield) {
                var k = this.getcellvalue(this.editcell.row, d.displayfield);
                var q = this.editcell.value;
                oldvalue = {
                    value: q,
                    label: k
                }
            } else {
                oldvalue = this.editcell.value
            }
            var f = this.getrowdata(h);
            if (d.cellendedit) {
                var s = d.cellendedit(h, n, d.columntype, this.editcell.value, i);
                if (s == false) {
                    this._raiseEvent(18, {
                        rowindex: h,
                        row: f,
                        datafield: n,
                        displayfield: d.displayfield,
                        oldvalue: oldvalue,
                        value: oldvalue,
                        columntype: d.columntype
                    });
                    g(this);
                    return false
                }
            }
            this._raiseEvent(18, {
                rowindex: h,
                row: f,
                datafield: n,
                displayfield: d.displayfield,
                oldvalue: oldvalue,
                value: i,
                columntype: d.columntype
            });
            this._hidecelleditor(false);
            if (this.editcell != undefined) {
                this.editcell.editor = null;
                this.editcell.editing = false
            }
            this.editcell = null;
            this.editchar = null;
            this.setcellvalue(h, n, i, e);
            if (!this.enablebrowserselection) {
                this.host.addClass("jqx-disableselect");
                this.content.addClass("jqx-disableselect")
            }
            if (!a.jqx.browser.msie) {
                t()
            }
            a.data(document.body, "jqxgrid.edit", "");
            return true
        },
        beginrowedit: function(f) {
            var e = this;
            var g = -1;
            if (f == undefined) {
                return
            }
            e._oldselectedrow = f;
            this._cellscache = new Array();
            var c = false;
            if (this.editmode != "selectedrow") {
                c = true
            }
            if (c) {
                var b = this.editmode;
                this.editmode = "selectedrow"
            }
            var d = null;
            if (this._currentEditableColumn) {
                d = this.getcolumnat(this._currentEditableColumn).datafield
            }
            a.each(this.columns.records, function(i, k) {
                if (e.editable && this.editable) {
                    if (this.columntype === "checkbox" || this.columntype === "custom" || this.columntype === "widget" || this.columntype === "template" || this.columntype === "button") {
                        return true
                    }
                    if (!d) {
                        d = this.datafield
                    }
                    var h = e.getcell(f, this.datafield);
                    e.begincelledit(f, this.datafield, null, false, false);
                    var j = e.getrowdata(f);
                    e._raiseEvent(17, {
                        rowindex: f,
                        row: j,
                        datafield: this.datafield,
                        value: h.value,
                        columntype: this.columntype
                    })
                }
            });
            if (e.editcell) {
                e.editcell.init = true
            }
            this._renderrows(this.virtualsizeinfo);
            if (c) {
                this.editmode = b
            }
            if (d && e.editcell) {
                setTimeout(function() {
                    if (e.editcell && e.editcell[d]) {
                        var h = e.editcell[d].editor;
                        if (h) {
                            if (h.data().jqxWidget && h.data().jqxWidget.focus) {
                                h.data().jqxWidget.focus()
                            } else {
                                h.focus()
                            }
                        }
                    }
                }, 25)
            }
        },
        endrowedit: function(k, o) {
            var D = this;
            this._currentEditableColumn = 0;
            this._focusedColumn = null;
            this._currentColumn = null;
            this._checkboxCells = [];
            if (!this.editcell) {
                return false
            }
            if (this.editcell.editor == undefined && this.editcell.columntype !== "checkbox") {
                return false
            }
            var C = function() {
                if (focus != false) {
                    if (D.isTouchDevice()) {
                        return
                    }
                    if (!D.isNestedGrid) {
                        var i = D.getScrollTop();
                        var F = D.getScrollLeft();
                        try {
                            D.element.focus();
                            D.content.focus();
                            if (i != D.getScrollTop()) {
                                window.scrollTo(F, i)
                            }
                            setTimeout(function() {
                                D.element.focus();
                                D.content.focus();
                                if (i != D.getScrollTop()) {
                                    window.scrollTo(F, i)
                                }
                            }, 10)
                        } catch (E) {}
                    }
                }
            };
            var p = false;
            if (this.editmode != "selectedrow") {
                p = true
            }
            if (p) {
                var v = this.editmode;
                this.editmode = "selectedrow"
            }
            var h = false;
            var d = {};
            if (this.validationpopup) {
                this.validationpopup.hide();
                this.validationpopuparrow.hide()
            }
            for (var B = 0; B < this.columns.records.length; B++) {
                var e = this.columns.records[B];
                if (!e.editable) {
                    continue
                }
                if (e.hidden) {
                    continue
                }
                if (e.columntype == "checkbox") {
                    continue
                }
                if (e.createwidget) {
                    continue
                }
                var l = this._geteditorvalue(e);
                var g = function(F) {
                    F._hidecelleditor();
                    var E = F.getcellvalue(F.editcell.row, e.displayfield);
                    if (e.cellendedit) {
                        e.cellendedit(k, u, e.columntype, E, l)
                    }
                    F.editchar = null;
                    if (e.displayfield != e.datafield) {
                        var i = F.getcellvalue(F.editcell.row, e.displayfield);
                        var H = E;
                        n = {
                            value: H,
                            label: i
                        }
                    } else {
                        n = E
                    }
                    var G = F.getrowdata(k);
                    F._raiseEvent(18, {
                        rowindex: k,
                        row: G,
                        datafield: u,
                        displayfield: e.displayfield,
                        oldvalue: E,
                        value: E,
                        columntype: e.columntype
                    });
                    F.editcell.editing = false
                };
                if (o) {
                    g(this);
                    continue
                }
                if (e.cellvaluechanging) {
                    var n = this.getcellvalue(this.editcell.row, e.displayfield);
                    var b = e.cellvaluechanging(k, u, e.columntype, n, l);
                    if (b != undefined) {
                        l = b
                    }
                }
                var u = e.datafield;
                if (e.validation) {
                    var c = this.getcell(k, e.datafield);
                    try {
                        var w = e.validation(c, l);
                        var r = this.gridlocalization.validationstring;
                        if (w.message != undefined) {
                            r = w.message
                        }
                        var t = typeof w == "boolean" ? w : w.result;
                        if (!t) {
                            if (w.showmessage == undefined || w.showmessage == true) {
                                this._showvalidationpopup(k, u, r)
                            }
                            h = true;
                            this.editcell[e.datafield].validated = false;
                            continue
                        }
                    } catch (z) {
                        this._showvalidationpopup(k, u, this.gridlocalization.validationstring);
                        this.editcell[e.datafield].validated = false;
                        h = true;
                        continue
                    }
                }
                if (e.displayfield != e.datafield) {
                    var q = this.getcellvalue(this.editcell.row, e.displayfield);
                    var x = this.editcell.value;
                    n = {
                        value: x,
                        label: q
                    }
                } else {
                    n = this.getcellvalue(this.editcell.row, e.displayfield)
                }
                d[e.datafield] = {
                    newvalue: l,
                    oldvalue: n
                }
            }
            var y = {};
            var s = {};
            if (!h) {
                this._hidecelleditor(false);
                for (var B = 0; B < this.columns.records.length; B++) {
                    var e = this.columns.records[B];
                    var u = e.datafield;
                    if (e.hidden) {
                        continue
                    }
                    if (!e.editable) {
                        continue
                    }
                    var f = this.getrowdata(k);
                    if (e.createwidget) {
                        continue
                    }
                    if (e.columntype == "checkbox") {
                        var l = this.getcellvalue(k, e.displayfield);
                        this._raiseEvent(18, {
                            rowindex: k,
                            row: f,
                            datafield: e.datafield,
                            displayfield: e.displayfield,
                            oldvalue: l,
                            value: l,
                            columntype: e.columntype
                        });
                        continue
                    }
                    if (!d[e.datafield]) {
                        continue
                    }
                    var l = d[e.datafield].newvalue;
                    var n = d[e.datafield].oldvalue;
                    if (e.cellendedit) {
                        var A = e.cellendedit(k, u, e.columntype, n, l);
                        if (A == false) {
                            this._raiseEvent(18, {
                                rowindex: k,
                                row: f,
                                datafield: u,
                                displayfield: e.displayfield,
                                oldvalue: n,
                                value: n,
                                columntype: e.columntype
                            });
                            g(this);
                            continue
                        }
                    }
                    if (!this.source.updaterow) {
                        this._raiseEvent(18, {
                            rowindex: k,
                            row: f,
                            datafield: e.datafield,
                            displayfield: e.displayfield,
                            oldvalue: n,
                            value: l,
                            columntype: e.columntype
                        })
                    }
                    y[e.datafield] = l;
                    s[e.datafield] = n
                }
                var j = this.getrowid(k);
                var f = this.getrowdata(k);
                a.each(y, function(i, F) {
                    if (F && F.label != undefined) {
                        var E = D.getcolumn(i);
                        f[E.displayfield] = F.label;
                        f[E.datafield] = F.value
                    } else {
                        f[i] = F
                    }
                });
                if (!this.enablebrowserselection) {
                    this.host.addClass("jqx-disableselect");
                    this.content.addClass("jqx-disableselect")
                }
                a.data(document.body, "jqxgrid.edit", "");
                this.editcell = null;
                this.editchar = null;
                if (this.source.updaterow && !o) {
                    var m = false;
                    var D = this;
                    var t = function(I) {
                        var G = D.source.updaterow;
                        D.source.updaterow = null;
                        if (false == I) {
                            a.each(s, function(i, K) {
                                if (K && K.label != undefined) {
                                    var J = D.getcolumn(i);
                                    f[J.displayfield] = K.label;
                                    f[J.datafield] = K.value
                                } else {
                                    f[i] = K
                                }
                            });
                            D.updaterow(j, f)
                        } else {
                            D.updaterow(j, f)
                        }
                        for (var F = 0; F < D.columns.records.length; F++) {
                            var H = D.columns.records[F];
                            var E = H.datafield;
                            D._raiseEvent(18, {
                                rowindex: k,
                                datafield: H.datafield,
                                row: f,
                                displayfield: H.displayfield,
                                oldvalue: s[H.datafield],
                                value: f[H.displayfield],
                                columntype: H.columntype
                            })
                        }
                        D.source.updaterow = G
                    };
                    try {
                        m = this.source.updaterow(j, f, t);
                        if (m == undefined) {
                            m = true
                        }
                    } catch (z) {
                        m = false;
                        return
                    }
                } else {
                    if (!o) {
                        this.updaterow(j, f)
                    }
                    this._renderrows(this.virtualsizeinfo)
                }
            }
            if (p) {
                this.editmode = v
            }
            return h
        },
        _selection: function(b) {
            if ("selectionStart"in b[0]) {
                var g = b[0];
                var h = g.selectionEnd - g.selectionStart;
                return {
                    start: g.selectionStart,
                    end: g.selectionEnd,
                    length: h,
                    text: g.value
                }
            } else {
                var d = document.selection.createRange();
                if (d == null) {
                    return {
                        start: 0,
                        end: g.value.length,
                        length: 0
                    }
                }
                var c = b[0].createTextRange();
                var f = c.duplicate();
                c.moveToBookmark(d.getBookmark());
                f.setEndPoint("EndToStart", c);
                var h = d.text.length;
                return {
                    start: f.text.length,
                    end: f.text.length + d.text.length,
                    length: h,
                    text: d.text
                }
            }
        },
        _setSelection: function(e, b, d) {
            if ("selectionStart"in d[0]) {
                d[0].focus();
                d[0].setSelectionRange(e, b)
            } else {
                var c = d[0].createTextRange();
                c.collapse(true);
                c.moveEnd("character", b);
                c.moveStart("character", e);
                c.select()
            }
        },
        findRecordIndex: function(g, c, b) {
            var b = b;
            if (c) {
                var e = b.length;
                for (var h = 0; h < e; h++) {
                    var f = b[h];
                    var d = f.label;
                    if (g == d) {
                        return h
                    }
                }
            }
            return -1
        },
        _destroyeditors: function() {
            var b = this;
            if (!this.columns.records) {
                return
            }
            a.each(this.columns.records, function(f, j) {
                var c = a.trim(this.datafield).split(" ").join("");
                switch (this.columntype) {
                case "dropdownlist":
                    var g = b.editors["dropdownlist_" + c];
                    if (g) {
                        g.jqxDropDownList("destroy");
                        b.editors["dropdownlist_" + c] = null
                    }
                    break;
                case "combobox":
                    var k = b.editors["combobox_" + c];
                    if (k) {
                        k.jqxComboBox("destroy");
                        b.editors["combobox_" + c] = null
                    }
                    break;
                case "datetimeinput":
                    var d = b.editors["datetimeinput_" + this.datafield];
                    if (d) {
                        d.jqxDateTimeInput("destroy");
                        b.editors["datetimeinput_" + c] = null
                    }
                    break;
                case "numberinput":
                    var e = b.editors["numberinput_" + c];
                    if (e) {
                        e.jqxNumberInput("destroy");
                        b.editors["numberinput_" + c] = null
                    }
                    break;
                case "custom":
                case "template":
                    if (b.destroyeditor) {
                        if (b.editors["templateeditor_" + c]) {
                            b.destroyeditor(b.editors["templateeditor_" + c]);
                            b.editors["templateeditor_" + c] = null
                        }
                    }
                    if (b.destroyeditor) {
                        var m = b.getrows.length();
                        for (var l = 0; l < m; l++) {
                            if (b.editors["customeditor_" + c + "_" + l]) {
                                b.destroyeditor(b.editors["customeditor_" + c + "_" + l], l);
                                b.editors["customeditor_" + c + "_" + l] = null
                            }
                        }
                    }
                    break;
                case "textbox":
                default:
                    var h = b.editors["textboxeditor_" + c];
                    if (h) {
                        b.removeHandler(h, "keydown");
                        b.editors["textbox_" + c] = null
                    }
                    break
                }
            });
            b.editors = new Array()
        },
        _showcelleditor: function(r, H, o, L, x) {
            if (o == undefined) {
                return
            }
            if (this.editcell == null) {
                return
            }
            if (H.columntype == "checkbox" && H.editable) {
                if (this.editmode == "selectedrow") {
                    if (!this._checkboxCells) {
                        this._checkboxCells = []
                    }
                    this._checkboxCells[H.datafield] = o
                }
                return
            }
            if (x == undefined) {
                x = true
            }
            if (this.editmode == "selectedrow") {
                this.editchar = "";
                x = false
            }
            var F = H.datafield;
            var h = a(o);
            var t = this;
            var d = this.editcell.editor;
            var J = this.getcellvalue(r, F);
            var D = this.getcelltext(r, F);
            var k = this.hScrollInstance;
            var u = k.value;
            var j = parseInt(u);
            var K = this.columns.records.indexOf(H);
            this.editcell.element = o;
            if (this.editcell.validated == false) {
                var I = "";
                if (this.validationpopup) {
                    I = this.validationpopup.text()
                }
                this._showvalidationpopup(r, F, I)
            }
            var m = function(e) {
                if (t.hScrollInstance.isScrolling() || t.vScrollInstance.isScrolling()) {
                    return
                }
                if (!x) {
                    return
                }
                if (t.isTouchDevice()) {
                    return
                }
                if (e) {
                    e.focus()
                }
                if (t.gridcontent[0].scrollTop != 0) {
                    t.scrolltop(Math.abs(t.gridcontent[0].scrollTop));
                    t.gridcontent[0].scrollTop = 0
                }
                if (t.gridcontent[0].scrollLeft != 0) {
                    t.gridcontent[0].scrollLeft = 0
                }
            };
            switch (H.columntype) {
            case "dropdownlist":
                if (this.host.jqxDropDownList) {
                    o.innerHTML = "";
                    var E = a.trim(H.datafield).split(" ").join("");
                    var B = a.trim(H.displayfield).split(" ").join("");
                    if (E.indexOf(".") != -1) {
                        E = E.replace(".", "")
                    }
                    if (B.indexOf(".") != -1) {
                        B = B.replace(".", "")
                    }
                    var l = this.editors["dropdownlist_" + E];
                    d = l == undefined ? a("<div style='border-radius: 0px; -moz-border-radius: 0px; -webkit-border-radius: 0px; z-index: 799; top: 0px; left: 0px; position: absolute;' id='dropdownlisteditor'></div>") : l;
                    d.css("top", a(o).parent().position().top);
                    if (this.oldhscroll) {
                        d.css("left", -j + parseInt(a(o).position().left))
                    } else {
                        d.css("left", parseInt(a(o).position().left))
                    }
                    if (H.pinned) {
                        d.css("left", j + parseInt(a(o).position().left))
                    }
                    if (l == undefined) {
                        d.prependTo(this.table);
                        d[0].id = "dropdownlisteditor" + this.element.id + E;
                        var g = this.source._source ? true : false;
                        var y = null;
                        if (!g) {
                            y = new a.jqx.dataAdapter(this.source,{
                                autoBind: false,
                                uniqueDataFields: [B],
                                async: false,
                                autoSort: true,
                                autoSortField: B
                            })
                        } else {
                            var q = {
                                localdata: JSON.parse(JSON.stringify(this.source.records)),
                                datatype: this.source.datatype,
                                async: false
                            };
                            y = new a.jqx.dataAdapter(q,{
                                autoBind: false,
                                async: false,
                                uniqueDataFields: [B],
                                autoSort: true,
                                autoSortField: B
                            })
                        }
                        var v = !H.createeditor ? true : false;
                        d.jqxDropDownList({
                            enableBrowserBoundsDetection: true,
                            keyboardSelection: false,
                            source: y,
                            rtl: this.rtl,
                            autoDropDownHeight: v,
                            theme: this.theme,
                            width: h.width() - 2,
                            height: h.height() - 2,
                            displayMember: B,
                            valueMember: F
                        });
                        this.editors["dropdownlist_" + E] = d;
                        if (H.createeditor) {
                            H.createeditor(r, J, d)
                        }
                    }
                    if (H._requirewidthupdate) {
                        d.jqxDropDownList({
                            width: h.width() - 2
                        })
                    }
                    var c = d.jqxDropDownList("listBox").visibleItems;
                    if (!H.createeditor) {
                        if (c.length < 8) {
                            d.jqxDropDownList("autoDropDownHeight", true)
                        } else {
                            d.jqxDropDownList("autoDropDownHeight", false)
                        }
                    }
                    var J = this.getcellvalue(r, B);
                    var A = this.findRecordIndex(J, B, c);
                    if (L) {
                        if (J != "") {
                            d.jqxDropDownList("selectIndex", A, true)
                        } else {
                            d.jqxDropDownList("selectIndex", -1)
                        }
                    }
                    if (!this.editcell) {
                        return
                    }
                    if (this.editcell.defaultvalue != undefined) {
                        d.jqxDropDownList("selectIndex", this.editcell.defaultvalue, true)
                    }
                    if (x) {
                        d.jqxDropDownList("focus")
                    }
                }
                break;
            case "combobox":
                if (this.host.jqxComboBox) {
                    o.innerHTML = "";
                    var E = a.trim(H.datafield).split(" ").join("");
                    var B = a.trim(H.displayfield).split(" ").join("");
                    if (E.indexOf(".") != -1) {
                        E = E.replace(".", "")
                    }
                    if (B.indexOf(".") != -1) {
                        B = B.replace(".", "")
                    }
                    var s = this.editors["combobox_" + E];
                    d = s == undefined ? a("<div style='border-radius: 0px; -moz-border-radius: 0px; -webkit-border-radius: 0px; z-index: 799; top: 0px; left: 0px; position: absolute;' id='comboboxeditor'></div>") : s;
                    d.css("top", a(o).parent().position().top);
                    if (this.oldhscroll) {
                        d.css("left", -j + parseInt(a(o).position().left))
                    } else {
                        d.css("left", parseInt(a(o).position().left))
                    }
                    if (H.pinned) {
                        d.css("left", j + parseInt(a(o).position().left))
                    }
                    if (s == undefined) {
                        d.prependTo(this.table);
                        d[0].id = "comboboxeditor" + this.element.id + E;
                        var g = this.source._source ? true : false;
                        var y = null;
                        if (!g) {
                            y = new a.jqx.dataAdapter(this.source,{
                                autoBind: false,
                                uniqueDataFields: [B],
                                async: false,
                                autoSort: true,
                                autoSortField: B
                            })
                        } else {
                            var q = {
                                localdata: JSON.parse(JSON.stringify(this.source.records)),
                                datatype: this.source.datatype,
                                async: false
                            };
                            y = new a.jqx.dataAdapter(q,{
                                autoBind: false,
                                async: false,
                                uniqueDataFields: [B],
                                autoSort: true,
                                autoSortField: B
                            })
                        }
                        var v = !H.createeditor ? true : false;
                        d.jqxComboBox({
                            enableBrowserBoundsDetection: true,
                            keyboardSelection: false,
                            source: y,
                            rtl: this.rtl,
                            autoDropDownHeight: v,
                            theme: this.theme,
                            width: h.width() - 2,
                            height: h.height() - 2,
                            displayMember: B,
                            valueMember: F
                        });
                        d.removeAttr("tabindex");
                        d.find("div").removeAttr("tabindex");
                        this.editors["combobox_" + E] = d;
                        if (H.createeditor) {
                            H.createeditor(r, J, d)
                        }
                    }
                    if (H._requirewidthupdate) {
                        d.jqxComboBox({
                            width: h.width() - 2
                        })
                    }
                    var c = d.jqxComboBox("listBox").visibleItems;
                    if (!H.createeditor) {
                        if (c.length < 8) {
                            d.jqxComboBox("autoDropDownHeight", true)
                        } else {
                            d.jqxComboBox("autoDropDownHeight", false)
                        }
                    }
                    var J = this.getcellvalue(r, B);
                    var A = this.findRecordIndex(J, B, c);
                    if (L) {
                        if (J != "") {
                            d.jqxComboBox("selectIndex", A, true);
                            d.jqxComboBox("val", J)
                        } else {
                            d.jqxComboBox("selectIndex", -1);
                            d.jqxComboBox("val", J)
                        }
                    }
                    if (!this.editcell) {
                        return
                    }
                    if (this.editcell.defaultvalue != undefined) {
                        d.jqxComboBox("selectIndex", this.editcell.defaultvalue, true)
                    }
                    if (this.editchar && this.editchar.length > 0) {
                        d.jqxComboBox("input").val(this.editchar)
                    }
                    if (x) {
                        setTimeout(function() {
                            m(d.jqxComboBox("input"));
                            if (d) {
                                d.jqxComboBox("_setSelection", 0, 0);
                                if (t.editchar) {
                                    d.jqxComboBox("_setSelection", 1, 1);
                                    t.editchar = null
                                } else {
                                    if (d.jqxComboBox("input")) {
                                        var e = d.jqxComboBox("input").val();
                                        d.jqxComboBox("_setSelection", 0, e.length)
                                    }
                                }
                            }
                        }, 10)
                    }
                }
                break;
            case "datetimeinput":
                if (this.host.jqxDateTimeInput) {
                    o.innerHTML = "";
                    var E = a.trim(H.datafield).split(" ").join("");
                    if (E.indexOf(".") != -1) {
                        E = E.replace(".", "")
                    }
                    var w = this.editors["datetimeinput_" + E];
                    d = w == undefined ? a("<div style='border-radius: 0px; -moz-border-radius: 0px; -webkit-border-radius: 0px; z-index: 799; top: 0px; left: 0px; position: absolute;' id='datetimeeditor'></div>") : w;
                    d.show();
                    d.css("top", a(o).parent().position().top);
                    if (this.oldhscroll) {
                        d.css("left", -j + parseInt(a(o).position().left))
                    } else {
                        d.css("left", parseInt(a(o).position().left))
                    }
                    if (H.pinned) {
                        d.css("left", j + parseInt(a(o).position().left))
                    }
                    if (w == undefined) {
                        d.prependTo(this.table);
                        d[0].id = "datetimeeditor" + this.element.id + E;
                        var G = {
                            calendar: this.gridlocalization
                        };
                        d.jqxDateTimeInput({
                            firstDayOfWeek: this.gridlocalization.firstDay,
                            enableBrowserBoundsDetection: true,
                            localization: G,
                            _editor: true,
                            theme: this.theme,
                            rtl: this.rtl,
                            width: h.width(),
                            height: h.height(),
                            formatString: H.cellsformat
                        });
                        this.editors["datetimeinput_" + E] = d;
                        if (H.createeditor) {
                            H.createeditor(r, J, d)
                        }
                    }
                    if (H._requirewidthupdate) {
                        d.jqxDateTimeInput({
                            width: h.width() - 2
                        })
                    }
                    if (L) {
                        if (J != "" && J != null) {
                            var M = new Date(J);
                            if (M == "Invalid Date") {
                                if (this.source.getvaluebytype) {
                                    M = this.source.getvaluebytype(J, {
                                        name: H.datafield,
                                        type: "date"
                                    })
                                }
                            }
                            d.jqxDateTimeInput("setDate", M)
                        } else {
                            d.jqxDateTimeInput("setDate", null)
                        }
                        if (this.editcell.defaultvalue != undefined) {
                            d.jqxDateTimeInput("setDate", this.editcell.defaultvalue)
                        }
                    }
                    if (x) {
                        var N = this.editEvent;
                        setTimeout(function() {
                            m(d.jqxDateTimeInput("dateTimeInput"));
                            setTimeout(function() {
                                d.jqxDateTimeInput("_selectGroup", 0);
                                if (t.editchar && t.editchar.length > 0) {
                                    var R = parseInt(t.editchar);
                                    if (!isNaN(R)) {
                                        if (N) {
                                            var e = N.charCode ? N.charCode : N.keyCode ? N.keyCode : 0;
                                            d.jqxDateTimeInput("_handleKeyPress", N, e)
                                        }
                                    }
                                }
                            }, 25)
                        }, 10)
                    }
                }
                break;
            case "numberinput":
                if (this.host.jqxNumberInput) {
                    o.innerHTML = "";
                    var E = a.trim(H.datafield).split(" ").join("");
                    if (E.indexOf(".") != -1) {
                        E = E.replace(".", "")
                    }
                    var P = this.editors["numberinput_" + E];
                    d = P == undefined ? a("<div style='border-radius: 0px; -moz-border-radius: 0px; -webkit-border-radius: 0px; z-index: 799; top: 0px; left: 0px; position: absolute;' id='numbereditor'></div>") : P;
                    d.show();
                    d.css("top", a(o).parent().position().top);
                    if (this.oldhscroll) {
                        d.css("left", -j + parseInt(a(o).position().left))
                    } else {
                        d.css("left", parseInt(a(o).position().left))
                    }
                    if (H.pinned) {
                        d.css("left", j + parseInt(a(o).position().left))
                    }
                    if (P == undefined) {
                        d.prependTo(this.table);
                        d[0].id = "numbereditor" + this.element.id + E;
                        var n = "";
                        var z = "left";
                        var O = 2;
                        if (H.cellsformat) {
                            if (H.cellsformat.indexOf("c") != -1) {
                                n = this.gridlocalization.currencysymbol;
                                z = this.gridlocalization.currencysymbolposition;
                                if (z == "before") {
                                    z = "left"
                                } else {
                                    z = "right"
                                }
                                if (H.cellsformat.length > 1) {
                                    O = parseInt(H.cellsformat.substring(1), 10)
                                }
                            } else {
                                if (H.cellsformat.indexOf("p") != -1) {
                                    n = this.gridlocalization.percentsymbol;
                                    z = "right";
                                    if (H.cellsformat.length > 1) {
                                        O = parseInt(H.cellsformat.substring(1), 10)
                                    }
                                }
                            }
                        } else {
                            O = 0
                        }
                        d.jqxNumberInput({
                            decimalSeparator: this.gridlocalization.decimalseparator,
                            decimalDigits: O,
                            inputMode: "simple",
                            theme: this.theme,
                            rtl: this.rtl,
                            width: h.width() - 1,
                            height: h.height() - 1,
                            spinButtons: true,
                            symbol: n,
                            symbolPosition: z
                        });
                        this.editors["numberinput_" + E] = d;
                        if (H.createeditor) {
                            H.createeditor(r, J, d)
                        }
                    }
                    if (H._requirewidthupdate) {
                        d.jqxNumberInput({
                            width: h.width() - 2
                        })
                    }
                    if (L) {
                        if (J != "" && J != null) {
                            var Q = J;
                            d.jqxNumberInput("setDecimal", Q)
                        } else {
                            d.jqxNumberInput("setDecimal", 0)
                        }
                        if (this.editcell.defaultvalue != undefined) {
                            d.jqxNumberInput("setDecimal", this.editcell.defaultvalue)
                        }
                        if (this.editchar && this.editchar.length > 0) {
                            var p = parseInt(this.editchar);
                            if (!isNaN(p)) {
                                d.jqxNumberInput("setDecimal", p)
                            }
                        }
                        if (x) {
                            setTimeout(function() {
                                m(d.jqxNumberInput("numberInput"));
                                d.jqxNumberInput("_setSelectionStart", 0);
                                if (t.editchar) {
                                    if (H.cellsformat.length > 0) {
                                        d.jqxNumberInput("_setSelectionStart", 2)
                                    } else {
                                        d.jqxNumberInput("_setSelectionStart", 1)
                                    }
                                    t.editchar = null
                                } else {
                                    var e = d.jqxNumberInput("spinButtons");
                                    if (e) {
                                        var R = d.jqxNumberInput("numberInput").val();
                                        t._setSelection(d.jqxNumberInput("numberInput")[0], R.length, R.length)
                                    } else {
                                        var R = d.jqxNumberInput("numberInput").val();
                                        t._setSelection(d.jqxNumberInput("numberInput")[0], 0, R.length)
                                    }
                                    d.jqxNumberInput("selectAll")
                                }
                            }, 10)
                        }
                    }
                }
                break;
            case "custom":
                o.innerHTML = "";
                var E = a.trim(H.datafield).split(" ").join("");
                if (E.indexOf(".") != -1) {
                    E = E.replace(".", "")
                }
                var C = this.editors["customeditor_" + E + "_" + r];
                d = C == undefined ? a("<div style='overflow: hidden; border-radius: 0px; -moz-border-radius: 0px; -webkit-border-radius: 0px; z-index: 799; top: 0px; left: 0px; position: absolute;' id='customeditor'></div>") : C;
                d.show();
                d.css("top", a(o).parent().position().top);
                if (this.oldhscroll) {
                    d.css("left", -j + parseInt(a(o).position().left))
                } else {
                    d.css("left", parseInt(a(o).position().left))
                }
                if (H.pinned) {
                    d.css("left", j + parseInt(a(o).position().left))
                }
                if (C == undefined) {
                    d.prependTo(this.table);
                    d[0].id = "customeditor" + this.element.id + E + "_" + r;
                    this.editors["customeditor_" + E + "_" + r] = d;
                    var b = h.width() - 1;
                    var f = h.height() - 1;
                    d.width(b);
                    d.height(f);
                    if (H.createeditor) {
                        H.createeditor(r, J, d, D, b, f, this.editchar)
                    }
                }
                if (H._requirewidthupdate) {
                    d.width(h.width() - 2)
                }
                break;
            case "template":
                o.innerHTML = "";
                var E = a.trim(H.datafield).split(" ").join("");
                if (E.indexOf(".") != -1) {
                    E = E.replace(".", "")
                }
                var i = this.editors["templateeditor_" + E];
                d = i == undefined ? a("<div style='overflow: hidden; border-radius: 0px; -moz-border-radius: 0px; -webkit-border-radius: 0px; z-index: 799; top: 0px; left: 0px; position: absolute;' id='templateeditor'></div>") : i;
                d.show();
                d.css("top", a(o).parent().position().top);
                if (this.oldhscroll) {
                    d.css("left", -j + parseInt(a(o).position().left))
                } else {
                    d.css("left", parseInt(a(o).position().left))
                }
                if (H.pinned) {
                    d.css("left", j + parseInt(a(o).position().left))
                }
                if (i == undefined) {
                    d.prependTo(this.table);
                    d[0].id = "templateeditor" + this.element.id + E;
                    this.editors["templateeditor_" + E] = d;
                    var b = h.width() - 1;
                    var f = h.height() - 1;
                    d.width(b);
                    d.height(f);
                    if (H.createeditor) {
                        H.createeditor(r, J, d, D, b, f, this.editchar)
                    }
                }
                if (H._requirewidthupdate) {
                    d.width(h.width() - 2)
                }
                break;
            case "textbox":
            default:
                o.innerHTML = "";
                d = this.editors["textboxeditor_" + H.datafield] || a("<input autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' type='textbox' id='textboxeditor'/>");
                d[0].id = "textboxeditor" + this.element.id + H.datafield;
                d.appendTo(h);
                if (this.rtl) {
                    d.css("direction", "rtl")
                }
                if (L || d[0].className == "") {
                    d.addClass(this.toThemeProperty("jqx-input"));
                    d.addClass(this.toThemeProperty("jqx-widget-content"));
                    if (this.editchar && this.editchar.length > 0) {
                        d.val(this.editchar)
                    } else {
                        if (H.cellsformat != "") {
                            J = this.getcelltext(r, F)
                        }
                        if (J == undefined) {
                            J = ""
                        }
                        d.val(J)
                    }
                    if (this.editcell.defaultvalue != undefined) {
                        d.val(this.editcell.defaultvalue)
                    }
                    d.width(h.width() + 1);
                    d.height(h.height() + 1);
                    if (H.createeditor) {
                        H.createeditor(r, J, d)
                    }
                    if (H.cellsformat != "") {
                        if (H.cellsformat.indexOf("p") != -1 || H.cellsformat.indexOf("c") != -1 || H.cellsformat.indexOf("n") != -1 || H.cellsformat.indexOf("f") != -1) {
                            if (!this.editors["textboxeditor_" + H.datafield]) {
                                d.keydown(function(R) {
                                    var X = R.charCode ? R.charCode : R.keyCode ? R.keyCode : 0;
                                    var U = String.fromCharCode(X);
                                    var V = parseInt(U);
                                    if (isNaN(V)) {
                                        return true
                                    }
                                    if (t._selection(d).length > 0) {
                                        return true
                                    }
                                    var T = "";
                                    var S = d.val();
                                    if (H.cellsformat.length > 1) {
                                        var W = parseInt(H.cellsformat.substring(1));
                                        if (isNaN(W)) {
                                            W = 0
                                        }
                                    } else {
                                        var W = 0
                                    }
                                    if (W > 0) {
                                        if (S.indexOf(t.gridlocalization.decimalseparator) != -1) {
                                            if (t._selection(d).start > S.indexOf(t.gridlocalization.decimalseparator)) {
                                                return true
                                            }
                                        }
                                    }
                                    for (var Y = 0; Y < S.length - W; Y++) {
                                        var e = S.substring(Y, Y + 1);
                                        if (e.match(/^[0-9]+$/) != null) {
                                            T += e
                                        }
                                    }
                                    if (T.length >= 11) {
                                        return false
                                    }
                                })
                            }
                        }
                    }
                }
                this.editors["textboxeditor_" + H.datafield] = d;
                if (L) {
                    if (x) {
                        setTimeout(function() {
                            m(d);
                            if (t.editchar) {
                                t._setSelection(d[0], 1, 1);
                                t.editchar = null
                            } else {
                                t._setSelection(d[0], 0, d.val().length)
                            }
                        }, 25)
                    }
                }
                break
            }
            if (d) {
                d[0].style.zIndex = 1 + parseInt(o.style.zIndex);
                if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                    d[0].style.zIndex = 1 + this.columns.records.length + o.style.zIndex
                }
                d.css("display", "block");
                this.editcell.editor = d;
                if (!this.editcell[F]) {
                    this.editcell[F] = {};
                    this.editcell[F].editor = d
                } else {
                    this.editcell[F].editor = d
                }
            }
            if (L) {
                if (H.initeditor) {
                    H.initeditor(r, J, d, D, this.editchar)
                }
            }
            if (t.isTouchDevice()) {
                return
            }
            setTimeout(function() {
                if (t.content) {
                    t.content[0].scrollTop = 0;
                    t.content[0].scrollLeft = 0
                }
                if (t.gridcontent) {
                    t.gridcontent[0].scrollLeft = 0;
                    t.gridcontent[0].scrollTop = 0
                }
            }, 10)
        },
        _setSelection: function(d, g, b) {
            try {
                if ("selectionStart"in d) {
                    d.setSelectionRange(g, b)
                } else {
                    var c = d.createTextRange();
                    c.collapse(true);
                    c.moveEnd("character", b);
                    c.moveStart("character", g);
                    c.select()
                }
            } catch (e) {
                var f = e
            }
        },
        _hideeditors: function() {
            if (this.editcells != null) {
                var b = this;
                for (var c in this.editcells) {
                    b.editcell = b.editcells[c];
                    b._hidecelleditor()
                }
            }
        },
        _hidecelleditor: function(b) {
            if (!this.editcell) {
                return
            }
            if (this.editmode === "selectedrow") {
                for (var c = 0; c < this.columns.records.length; c++) {
                    var e = this.columns.records[c];
                    if (this.editcell[e.datafield] && this.editcell[e.datafield].editor) {
                        this.editcell[e.datafield].editor.hide();
                        var d = this.editcell[e.datafield].editor;
                        switch (e.columntype) {
                        case "dropdownlist":
                            d.jqxDropDownList({
                                closeDelay: 0
                            });
                            d.jqxDropDownList("hideListBox");
                            d.jqxDropDownList({
                                closeDelay: 300
                            });
                            break;
                        case "combobox":
                            d.jqxComboBox({
                                closeDelay: 0
                            });
                            d.jqxComboBox("hideListBox");
                            d.jqxComboBox({
                                closeDelay: 300
                            });
                            break;
                        case "datetimeinput":
                            if (d.jqxDateTimeInput("isOpened")) {
                                d.jqxDateTimeInput({
                                    closeDelay: 0
                                });
                                d.jqxDateTimeInput("hideCalendar");
                                d.jqxDateTimeInput({
                                    closeDelay: 300
                                })
                            }
                            break
                        }
                    }
                }
                if (this.validationpopup) {
                    this.validationpopup.hide();
                    this.validationpopuparrow.hide()
                }
                return
            }
            if (this.editcell.columntype == "checkbox") {
                return
            }
            if (this.editcell.editor) {
                this.editcell.editor.hide();
                switch (this.editcell.columntype) {
                case "dropdownlist":
                    this.editcell.editor.jqxDropDownList({
                        closeDelay: 0
                    });
                    this.editcell.editor.jqxDropDownList("hideListBox");
                    this.editcell.editor.jqxDropDownList({
                        closeDelay: 300
                    });
                    break;
                case "combobox":
                    this.editcell.editor.jqxComboBox({
                        closeDelay: 0
                    });
                    this.editcell.editor.jqxComboBox("hideListBox");
                    this.editcell.editor.jqxComboBox({
                        closeDelay: 300
                    });
                    break;
                case "datetimeinput":
                    var f = this.editcell.editor;
                    if (f.jqxDateTimeInput("isOpened")) {
                        f.jqxDateTimeInput({
                            closeDelay: 0
                        });
                        f.jqxDateTimeInput("hideCalendar");
                        f.jqxDateTimeInput({
                            closeDelay: 300
                        })
                    }
                    break
                }
            }
            if (this.validationpopup) {
                this.validationpopup.hide();
                this.validationpopuparrow.hide()
            }
            if (!this.isNestedGrid) {
                if (b != false) {
                    this.element.focus()
                }
            }
        },
        _geteditorvalue: function(h) {
            var o = new String();
            if (!this.editcell) {
                return null
            }
            var l = this.editcell.editor;
            if (this.editmode == "selectedrow") {
                if (this.editcell[h.datafield]) {
                    var l = this.editcell[h.datafield].editor
                }
            }
            if (l) {
                switch (h.columntype) {
                case "textbox":
                default:
                    o = l.val();
                    if (h.cellsformat != "") {
                        var n = "string";
                        var e = this.source.datafields || ((this.source._source) ? this.source._source.datafields : null);
                        if (e) {
                            var p = "";
                            a.each(e, function() {
                                if (this.name == h.displayfield) {
                                    if (this.type) {
                                        p = this.type
                                    }
                                    return false
                                }
                            });
                            if (p) {
                                n = p
                            }
                        }
                        var i = n === "number" || n === "float" || n === "int" || n === "integer";
                        var f = n === "date" || n === "time";
                        if (i || (n === "string" && (h.cellsformat.indexOf("p") != -1 || h.cellsformat.indexOf("c") != -1 || h.cellsformat.indexOf("n") != -1 || h.cellsformat.indexOf("f") != -1))) {
                            if (o === "" && h.nullable) {
                                return ""
                            }
                            if (o.indexOf(this.gridlocalization.currencysymbol) > -1) {
                                o = o.replace(this.gridlocalization.currencysymbol, "")
                            }
                            var m = function(w, u, v) {
                                var s = w;
                                if (u == v) {
                                    return w
                                }
                                var t = s.indexOf(u);
                                while (t != -1) {
                                    s = s.replace(u, v);
                                    t = s.indexOf(u)
                                }
                                return s
                            };
                            var k = o;
                            k = new Number(k);
                            if (!isNaN(k)) {
                                return k
                            }
                            o = m(o, this.gridlocalization.thousandsseparator, "");
                            o = o.replace(this.gridlocalization.decimalseparator, ".");
                            if (o.indexOf(this.gridlocalization.percentsymbol) > -1) {
                                o = o.replace(this.gridlocalization.percentsymbol, "")
                            }
                            var d = "";
                            for (var r = 0; r < o.length; r++) {
                                var b = o.substring(r, r + 1);
                                if (b === "-") {
                                    d += "-"
                                }
                                if (b === ".") {
                                    d += "."
                                }
                                if (b.match(/^[0-9]+$/) != null) {
                                    d += b
                                }
                            }
                            o = d;
                            o = o.replace(/ /g, "");
                            o = new Number(o);
                            if (isNaN(o)) {
                                o = ""
                            }
                        }
                        if (f || (n === "string" && (h.cellsformat.indexOf("H") != -1 || h.cellsformat.indexOf("m") != -1 || h.cellsformat.indexOf("M") != -1 || h.cellsformat.indexOf("y") != -1 || h.cellsformat.indexOf("h") != -1 || h.cellsformat.indexOf("d") != -1))) {
                            if (o === "" && h.nullable) {
                                return ""
                            }
                            var c = o;
                            if (a.jqx.dataFormat) {
                                o = a.jqx.dataFormat.tryparsedate(c, this.gridlocalization)
                            }
                            if (o == "Invalid Date" || o == null) {
                                o = ""
                            }
                        }
                    }
                    if (h.displayfield != h.datafield) {
                        o = {
                            label: o,
                            value: o
                        }
                    }
                    break;
                case "checkbox":
                    if (l.jqxCheckBox) {
                        o = l.jqxCheckBox("checked")
                    }
                    break;
                case "datetimeinput":
                    if (l.jqxDateTimeInput) {
                        l.jqxDateTimeInput({
                            isEditing: false
                        });
                        if (l.jqxDateTimeInput("container").css("display") !== "none") {
                            l.jqxDateTimeInput("close")
                        }
                        l.jqxDateTimeInput("_validateValue");
                        o = l.jqxDateTimeInput("getDate");
                        if (o == null) {
                            return null
                        }
                        o = new Date(o.toString());
                        if (h.displayfield != h.datafield) {
                            o = {
                                label: o,
                                value: o
                            }
                        }
                    }
                    break;
                case "dropdownlist":
                    if (l.jqxDropDownList) {
                        var g = l.jqxDropDownList("selectedIndex");
                        var q = l.jqxDropDownList("listBox").getVisibleItem(g);
                        if (h.displayfield != h.datafield) {
                            if (q) {
                                o = {
                                    label: q.label,
                                    value: q.value
                                }
                            } else {
                                o = ""
                            }
                        } else {
                            if (q) {
                                o = q.label
                            } else {
                                o = ""
                            }
                        }
                        if (o == null) {
                            o = ""
                        }
                    }
                    break;
                case "combobox":
                    if (l.jqxComboBox) {
                        o = l.jqxComboBox("val");
                        if (h.displayfield != h.datafield) {
                            var q = l.jqxComboBox("getSelectedItem");
                            if (q != null) {
                                o = {
                                    label: q.label,
                                    value: q.value
                                }
                            }
                        }
                        if (o == null) {
                            o = ""
                        }
                    }
                    break;
                case "numberinput":
                    if (l.jqxNumberInput) {
                        if (this.touchdevice) {
                            l.jqxNumberInput("_doTouchHandling")
                        }
                        var j = l.jqxNumberInput("getDecimal");
                        o = new Number(j);
                        o = parseFloat(o);
                        if (isNaN(o)) {
                            o = 0
                        }
                        if (j === null) {
                            o = null
                        }
                        if (h.displayfield != h.datafield) {
                            o = {
                                label: o,
                                value: o
                            }
                        }
                    }
                    break
                }
                if (h.geteditorvalue) {
                    if (this.editmode == "selectedrow") {
                        o = h.geteditorvalue(this.editcell.row, this.getcellvalue(this.editcell.row, h.datafield), l)
                    } else {
                        o = h.geteditorvalue(this.editcell.row, this.editcell.value, l)
                    }
                }
            }
            return o
        },
        hidevalidationpopups: function() {
            if (this.popups) {
                a.each(this.popups, function() {
                    this.validation.remove();
                    this.validationrow.remove()
                });
                this.popups = new Array()
            }
            if (this.validationpopup) {
                this.validationpopuparrow.hide();
                this.validationpopup.hide()
            }
        },
        showvalidationpopup: function(f, j, h) {
            if (h == undefined) {
                var h = this.gridlocalization.validationstring
            }
            var g = a("<div style='z-index: 99999; top: 0px; left: 0px; position: absolute;'></div>");
            var r = a("<div style='width: 20px; height: 20px; z-index: 999999; top: 0px; left: 0px; position: absolute;'></div>");
            g.html(h);
            r.addClass(this.toThemeProperty("jqx-grid-validation-arrow-up"));
            g.addClass(this.toThemeProperty("jqx-grid-validation"));
            g.addClass(this.toThemeProperty("jqx-rc-all"));
            g.prependTo(this.table);
            r.prependTo(this.table);
            var l = this.hScrollInstance;
            var n = l.value;
            var d = parseInt(n);
            var b = this.getcolumn(j).uielement;
            var p = null;
            for (var o = 0; o < this.hittestinfo.length; o++) {
                if (f === this.hittestinfo[o].row.visibleindex) {
                    p = this.hittestinfo[o]
                }
            }
            if (!p) {
                this.ensurerowvisible(f);
                var s = this;
                g.remove();
                r.remove();
                setTimeout(function() {
                    var v = null;
                    for (var u = 0; u < s.hittestinfo.length; u++) {
                        if (f === s.hittestinfo[u].row.visibleindex) {
                            v = s.hittestinfo[u]
                        }
                    }
                    if (v) {
                        s.showvalidationpopup(f, j, h)
                    }
                }, 25);
                return
            }
            var c = a(p.visualrow);
            g.css("top", parseInt(c.position().top) + 30 + "px");
            var k = parseInt(g.css("top"));
            r.css("top", k - 12);
            r.removeClass();
            r.addClass(this.toThemeProperty("jqx-grid-validation-arrow-up"));
            var q = false;
            if (k >= this._gettableheight()) {
                r.removeClass(this.toThemeProperty("jqx-grid-validation-arrow-up"));
                r.addClass(this.toThemeProperty("jqx-grid-validation-arrow-down"));
                k = parseInt(c.position().top) - this.rowsheight - 5;
                if (k < 0) {
                    k = 0;
                    this.validationpopuparrow.removeClass(this.toThemeProperty("jqx-grid-validation-arrow-down"));
                    q = true
                }
                g.css("top", k + "px");
                r.css("top", k + g.outerHeight() - 9)
            }
            var t = -d + parseInt(a(b).position().left);
            r.css("left", d + t + 30);
            var m = g.width();
            if (m + t > this.host.width() - 20) {
                var e = m + t - this.host.width() + 40;
                t -= e
            }
            if (!q) {
                g.css("left", d + t)
            } else {
                g.css("left", d + parseInt(a(b).position().left) - g.outerWidth())
            }
            g.show();
            r.show();
            if (!this.popups) {
                this.popups = new Array()
            }
            this.popups[this.popups.length] = {
                validation: g,
                validationrow: r
            }
        },
        _showvalidationpopup: function(p, e, q) {
            var c = this.editcell;
            var k = this.editcell.editor;
            if (this.editmode == "selectedrow") {
                var c = this.editcell[e];
                if (c && c.editor) {
                    k = c.editor;
                    c.element = k
                }
            }
            if (!k) {
                return
            }
            if (this.validationpopup && a.jqx.isHidden(this.validationpopup)) {
                if (this.validationpopup.remove) {
                    this.validationpopup.remove();
                    this.validationpopuparrow.remove()
                }
                this.validationpopup = null;
                this.validationpopuparrow = null;
                if (e === undefined && q === undefined && this.editors && this.editors.length === 0) {
                    return
                }
            }
            if (!this.validationpopup) {
                var n = a("<div style='z-index: 99999; top: 0px; left: 0px; position: absolute;'></div>");
                var m = a("<div style='width: 20px; height: 20px; z-index: 999999; top: 0px; left: 0px; position: absolute;'></div>");
                n.html(q);
                m.addClass(this.toThemeProperty("jqx-grid-validation-arrow-up"));
                n.addClass(this.toThemeProperty("jqx-grid-validation"));
                n.addClass(this.toThemeProperty("jqx-rc-all"));
                n.prependTo(this.table);
                m.prependTo(this.table);
                this.validationpopup = n;
                this.validationpopuparrow = m
            } else {
                this.validationpopup.html(q)
            }
            var h = this.hScrollInstance;
            var j = h.value;
            var g = parseInt(j);
            if (this.editmode == "selectedrow") {
                if (this.visiblerows && this.visiblerows[this.editcell.visiblerowindex]) {
                    this.validationpopup.css("top", this.visiblerows[this.editcell.visiblerowindex].top + (this.rowsheight + 5) + "px")
                } else {
                    this.validationpopup.css("top", parseInt(a(c.editor).position().top) + (this.rowsheight + 5) + "px")
                }
            } else {
                this.validationpopup.css("top", parseInt(a(c.element).parent().position().top) + (this.rowsheight + 5) + "px")
            }
            var b = parseInt(this.validationpopup.css("top"));
            this.validationpopuparrow.css("top", b - 11);
            this.validationpopuparrow.removeClass();
            this.validationpopuparrow.addClass(this.toThemeProperty("jqx-grid-validation-arrow-up"));
            var o = this._gettableheight();
            var f = false;
            if (b >= o) {
                this.validationpopuparrow.removeClass(this.toThemeProperty("jqx-grid-validation-arrow-up"));
                this.validationpopuparrow.addClass(this.toThemeProperty("jqx-grid-validation-arrow-down"));
                b = parseInt(a(c.element).parent().position().top) - this.rowsheight - 5;
                if (this.editmode == "selectedrow") {
                    if (this.visiblerows && this.visiblerows[this.editcell.visiblerowindex]) {
                        b = this.visiblerows[this.editcell.visiblerowindex].top - this.rowsheight - 5
                    } else {
                        b = parseInt(a(c.editor).position().top) - this.rowsheight - 5
                    }
                }
                if (b < 0) {
                    b = 0;
                    this.validationpopuparrow.removeClass(this.toThemeProperty("jqx-grid-validation-arrow-down"));
                    f = true
                }
                this.validationpopup.css("top", b + "px");
                this.validationpopuparrow.css("top", b + this.validationpopup.outerHeight() - 9)
            }
            var l = -g + parseInt(a(c.element).position().left);
            this.validationpopuparrow.css("left", g + l + 30);
            var d = this.validationpopup.width();
            if (d + l > this.host.width() - 20) {
                var i = d + l - this.host.width() + 40;
                l -= i
            }
            if (!f) {
                this.validationpopup.css("left", g + l)
            } else {
                this.validationpopup.css("left", g + parseInt(a(c.element).position().left) - this.validationpopup.outerWidth())
            }
            if (this.editcell.editor.css("display") == "none") {
                this.validationpopup.hide();
                this.validationpopuparrow.hide()
            } else {
                this.validationpopup.show();
                this.validationpopuparrow.show()
            }
        }
    })
}
)(jqxBaseFramework);

//////////////////
// WEBPACK FOOTER
// ./static/jqwidgets/jqxgrid.edit.js
// module id = 372
// module chunks = 266
