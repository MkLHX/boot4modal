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
		'<div class="modal-body"></div>' +
		"</div>" +
		"</div>" +
		"</div>",
	header:
		'<div class="modal-header">' + '<h5 class="modal-title"></h5>' + "</div>",
	footer: '<div class="modal-footer"></div>',
	closeButton:
		'<button class="close" style="margin-top: -15px;"  data-dismiss="modal">' +
		"<span>&times;</span>" +
		"</button>",
	button:
		'<button class="btn btn-info boot4ok" data-dismiss="modal" type="button"></button>',
	buttonConfirm:
		'<button class="btn btn-default boot4cancel" data-dismiss="modal" type="button">Cancel</button>' +
		'<button class="btn btn-info boot4ok" data-dismiss="modal" type="button">Ok</button>',
};

let dialog = $(modalTemplate.dialog);
let body = dialog.find(".modal-body");
let callbacks = {
	onEscape: ""
};

function Initial(msg, options, bootModalOptions) {
	let tmsg = "";

	if (
		(msg.callback != undefined || msg.confirm) &&
		!$.isFunction(msg.callback)
	) {
		throw new Error("alert requires callback property to be a function");
	}

	if (msg.msg != undefined) {
		tmsg = msg.msg;
	} else if (msg.title != undefined) {
		tmsg = msg.msg;
	} else {
		tmsg = msg + modalTemplate.closeButton;
	}

	if (msg.title != undefined && dialog.find(".modal-header").length == 0) {
		body.before(modalTemplate.header);
		dialog.find(".modal-header").html(msg.title + modalTemplate.closeButton);
	}

	if (msg.style != undefined) {
		dialog.find(".modal-header").css(msg.style);
	}

	if (dialog.find(".btn-info").length == 0) {
		body.after(modalTemplate.footer);
		if (msg.confirmBox != undefined) {
			dialog.find(".modal-footer").html(modalTemplate.buttonConfirm);
			if (options.button_labels != undefined) {
				dialog.find(".modal-footer").find(".boot4cancel").text(options.button_labels.cancel_label);
				dialog.find(".modal-footer").find(".boot4ok").text(options.button_labels.ok_label);
			}
		} else {
			dialog.find(".modal-footer").html(modalTemplate.button);
			if (options.btnMsg != undefined) {
				dialog.find(".btn").html(options.btnMsg);
			} else {
				console.debug('missing options.btnMsg in alert declaration!');
			}
		}
	}
	dialog.find(".modal-body").html(tmsg);
	if (msg.size != undefined) {
		switch (msg.size) {
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

	if (msg.centered != undefined && msg.centered == true) {
		dialog.find(".modal-dialog").addClass("modal-dialog-centered");
	}

}

let boot4 = {
	alert: function (msg, options, bootModalOptions) {
		Initial(msg, options);
		$("body").append(dialog);
		if (msg.callback != undefined) {
			$("#boot4modal").modal(bootModalOptions);
			return (callbacks.onEscape = msg.callback);
		} else {
			return $("#boot4modal").modal(bootModalOptions);
		}
	},
	confirm: function (msg, options, bootModalOptions) {
		msg.confirmBox = true;
		Initial(msg, options);
		$("body").append(dialog);
		$("#boot4modal").modal(bootModalOptions);
		return (callbacks.onEscape = msg.callback);
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
