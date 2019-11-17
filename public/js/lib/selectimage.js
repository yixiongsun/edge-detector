$(document).ready(() => {

	console.log(numImages)
	let d = $("div.images")

	for (let i = 1; i <= numImages; i++) {
		d.append("<div class='padding'><img class='select' src='/resources/img" + i + ".jpg'><div>")
	}

	$("img.select").click(function () {
		$("div.imageView").hide()
		$("div.body").append("<div class='padding'><img class='boundary' src='" + $(this).attr("src") + "'></div>")
		$("div.body").append("<button class='btn btn-primary back'>Back</button>")

		$("button.back").click(function() {
			$("img.boundary").parent().remove()
			$(this).remove()
			$("div.imageView").show()
		})

		let src = $(this).attr("src")

		$("img.boundary").click(function (e) {
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;

			// api request
			$("div.loader").addClass("spinner")
			$.post("/boundary", { x: x, y: y, file: src}).done(function (data) {
				$("div.loader").removeClass("spinner")
				$("img.boundary").attr("src", data)
			})
		});
	})




});