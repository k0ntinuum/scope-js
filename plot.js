
function plot(f) {
    pen.lineWidth =9;
    pen.strokeStyle = f.color;
    for (let i = 0; i < (pixels_per_unit * (max_x_value - min_x_value)); i++) {
        sample_x = min_x_value + i / pixels_per_unit;
        sample_y = forward(f,sample_x);

        if (i > 0) {
            pen.beginPath();
            pen.moveTo(hor_pixels_per_unit*(last_x-min_x_value),down_padding + plot_canvas.height-ver_pixels_per_unit*(last_y-min_y_value));
            pen.lineTo(hor_pixels_per_unit*(sample_x-min_x_value),down_padding + plot_canvas.height-ver_pixels_per_unit*(sample_y-min_y_value));
            pen.stroke();
        }
        last_x = sample_x;
        last_y = sample_y;
    }
}

function draw_function_frame() {
    pen.lineWidth = 15;
    pen.beginPath();
    pen.rect(0,0,plot_canvas.width,plot_canvas.height);
    pen.strokeStyle = "#000000";
    pen.stroke();
}


function erase_function_canvas(f) {
    pen.clearRect(0, 0, plot_canvas.width, plot_canvas.height);
}




function plot_function() {
    draw_function_frame();
    plot_data(data);
    plot(f);
}

function erase_all() {
    erase_function_canvas();
    erase_structure_canvas();
}

