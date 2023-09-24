
function new_data(num_data) {
    let data = [];
    let dx = (max_x_value - min_x_value)/(num_data+1);
    for (let i = 0; i < num_data; i++) {
        data[i] = { 
            x : dx*(i + 1) + min_x_value, 
            y : random_in(0.9*min_y_value, 0.9*max_y_value),
        }; 
    }
    return data;
}

function random_in(a,b) {
    return a + (b - a )*Math.random();
}

function plot_data(data) {
    pen.strokeStyle = "#aaaaaa";
    pen.lineWidth = 7;
    for (let i = 0; i < data.length; i++) {
        sample_x = data[i].x;
        sample_y = data[i].y;
        draw_data_point(hor_pixels_per_unit*(sample_x - min_x_value),plot_canvas.height-ver_pixels_per_unit*(sample_y-min_y_value), data_size);
    }
}

function draw_round_pixel(x,y,r) {
    pen.beginPath();
    pen.arc(x,y,r,0,2*Math.PI);
    pen.fill();
}

function draw_data_point(x,y,r) {
    pen.beginPath();
    pen.arc(x,y,r,0,2*Math.PI);
    pen.stroke();
}
