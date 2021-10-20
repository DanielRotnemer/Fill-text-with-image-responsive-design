var resizeTime;
var resizeTimeout = false;
var resizeDelta = 200;

function measureImage(parentHeight, parentWidth, imgHeight, imgWidth)
{
    parentHeight = Math.ceil(parentHeight);
    parentWidth = Math.ceil(parentWidth);
    if (imgHeight < parentHeight || imgWidth < parentWidth)
    {
        let wDifference = (parentWidth - imgWidth) / parentWidth;
        let hDifference = (parentHeight - imgHeight) / parentHeight;
        let largestDiff = hDifference > wDifference ? hDifference : wDifference;
        imgWidth = parseInt(imgWidth + (parentWidth * largestDiff));
        imgHeight = parseInt(imgHeight + (parentHeight * largestDiff));
    }
    else 
    {
        let wDifference = (imgWidth - parentWidth) / imgWidth;
        let hDifference = (imgHeight - parentHeight) / imgHeight;
        let smallestDiff = hDifference < wDifference ? hDifference : wDifference;
        imgWidth = parseInt(imgWidth - (parentWidth * smallestDiff));
        imgHeight = parseInt(imgHeight - (parentHeight * smallestDiff));
    }
    let xPosition = parseInt((parentWidth - imgWidth) / 2);
    let yPosition = parseInt((parentHeight - imgHeight) / 2);
    return xPosition + ", " + yPosition + ", " + imgWidth + ", " + imgHeight;
}

function resizeImage()
{
    let img = new Image();
    img.onload = function()
    {
        let size = measureImage($(".text").height(), $(".text").width(), img.height, img.width);

        let left = parseInt(size.substring(0, size.indexOf(", ")));
        size = size.substring(size.indexOf(", ") + 2);
        let top = parseInt(size.substring(0, size.indexOf(", ")));
        size = size.substring(size.indexOf(", ") + 2);
        let width = parseInt(size.substring(0, size.indexOf(", ")));
        size = size.substring(size.indexOf(", ") + 2);
        let height = parseInt(size);

        $(".text").css("background-position", left + "px " + top + "px");
        $(".text").css("background-size", width + "px " + height + "px");
    };
    img.src = "images/image.jpg";
}

function resizeEndded()
{
    if (new Date() - resizeTime < resizeDelta) {
        setTimeout(resizeEndded, resizeDelta);
    }
    else
    {
        resizeTimeout = false;
        resize();
        resizeImage();
    }
}

function resize()
{
    if (window.innerHeight > $(".container").height()) {
        $("body").css("height", "100%");
    }
    else {
        $("body").css("height", "auto");
    }
    let top = ($(window).height() - $(".container").height()) / 2;
    $(".container").css("top", top + "px");
}

$(window).on("resize", function()
{
    resize();
});

$(window).on("load", function()
{
    resize();
});