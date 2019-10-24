"use strict";

if (typeof define === "function" && define.amd) {
	define(["jquery"]);
} else if (typeof exports === "object") {
	if (typeof $ === "undefined") {
		module.exports = require("jquery");
	} else {
		module.exports = $;
	}
}

let modalTemplate = {
	dialog:
		'<div id="boot4modal" class="modal fade">' +
		'<div class="modal-dialog">' +
		'<div class="modal-content">' +
		'<div class="modal-body py-5"></div>' +
		"</div>" +
		"</div>" +
		"</div>",
	header: '<div class="modal-header">' + '<h5 class="modal-title"></h5>' + "</div>",
	footer: '<div class="modal-footer"></div>',
	closeButton:
		'<button class="close" style="margin-top: -15px;"  data-dismiss="modal">' +
		"<span>&times;</span>" +
		"</button>",
	button:
		'<button class="btn btn-info boot4ok" data-dismiss="modal" type="button">Close</button>',
	buttonConfirm:
		'<button class="btn btn-light boot4cancel" data-dismiss="modal" type="button">Cancel</button>' +
		'<button class="btn btn-info boot4ok" data-dismiss="modal" type="button">Ok</button>'
};

let dialog = $(modalTemplate.dialog);
let body = dialog.find(".modal-body");
let callbacks = {
	onEscape: ""
};

function Initial(properties, bootModalOptions) {
	let tmpprops = "";
	if (
		(properties.callback != undefined || properties.confirm) &&
		!$.isFunction(properties.callback)
	) {
		throw new Error("alert requires callback property to be a function");
	}
	if (properties.msg != undefined) {
		tmpprops = properties.msg;
	} else if (properties.title != undefined) {
		tmpprops = properties.msg;
	} else {
		tmpprops = properties.msg + modalTemplate.closeButton;
	}
	if (properties.title != undefined && dialog.find(".modal-header").length == 0) {
		body.before(modalTemplate.header);
		dialog.find(".modal-header").html(properties.title + modalTemplate.closeButton);
	}
	if (properties.style != undefined) {
		dialog.find(".modal-header").css(properties.style);
	}
	if (dialog.find(".modal-footer").length == 0) {
		body.after(modalTemplate.footer);
	}
	if (properties.confirmBox != undefined) {
		dialog.find(".modal-footer").html(modalTemplate.buttonConfirm);
		if (properties.buttons_labels != undefined) {
			dialog.find(".boot4cancel").text(properties.buttons_labels.cancel_btn);
			dialog.find(".boot4ok").text(properties.buttons_labels.ok_btn);
		}
	} else {
		dialog.find(".modal-footer").html(modalTemplate.button);
		if (properties.buttons_labels != undefined) {
			dialog.find(".boot4ok").text(properties.buttons_labels.ok_btn);
		}
	}
	dialog.find(".modal-body").html(tmpprops);
	if (properties.size != undefined) {
		switch (properties.size) {
			case "sm":
				dialog.find(".modal-dialog").addClass("modal-sm");
				break;
			case "lg":
				dialog.find(".modal-dialog").addClass("modal-lg");
				break;
			case "xl":
				dialog.find(".modal-dialog").addClass("modal-xl");
				break;
			default:
				break;
		}
	}
	if (properties.centered != undefined && properties.centered == true) {
		dialog.find(".modal-dialog").addClass("modal-dialog-centered");
	}
}

let boot4 = {
	alert: function (properties, bootModalOptions) {
		Initial(properties, bootModalOptions);
		$("body").append(dialog);
		if (properties.callback != undefined) {
			$("#boot4modal").modal(bootModalOptions);
			return (callbacks.onEscape = properties.callback);
		} else {
			return $("#boot4modal").modal(bootModalOptions);
		}
	},
	confirm: function (properties, bootModalOptions) {
		properties.confirmBox = true;
		Initial(properties, bootModalOptions);
		$("body").append(dialog);
		$("#boot4modal").modal(bootModalOptions);
		return (callbacks.onEscape = properties.callback);
	}
};

function processCallback(e, dialog, callback, result) {
	e.stopPropagation();
	e.preventDefault();
	let preserveDialog =
		$.isFunction(callback) && callback.call(dialog, result, e) === false;
	if (!preserveDialog) {
		dialog.modal("hide");
	}
}
dialog.on("click", ".boot4ok", function (e) {
	processCallback(e, dialog, callbacks.onEscape, true);
});
dialog.on("click", ".boot4cancel", function (e) {
	processCallback(e, dialog, callbacks.onEscape, false);
});