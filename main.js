



function update_models() {
    current_error = backprop_over_points(f);
}

function plot_models() {
    erase_function_canvas();
    plot_data(data);
    plot(f);
    draw_function_frame();
    erase_structure_canvas(f);
    plot_structure(f);
}

function load_new_data() {
    data = new_data(Math.floor(Math.random() * 8) +3 );
}

function clean_f() {
    clean(f,1.0);
}

function reset_f() {
    f = new_net(random_network_structure());
}

reset_f();
data = new_data(7);

setInterval(update_models,1);
setInterval(plot_models,50);
setInterval(clean_f,1000);