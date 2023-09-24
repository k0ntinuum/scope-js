
function draw_structure_frame(f) {
    f.context.strokeStyle = "#000000";
    f.context.lineWidth = 15;
    f.context.beginPath();
    f.context.rect(0,0,structure_W,structure_H);
    //f.context.strokeStyle = f.color;
    f.context.stroke();
}

function plot_graph_nodes(f) {
    for (node = 0; node < f.num_nodes; node++) {
        f.context.strokeStyle = "#000000";
        f.context.lineWidth = 1;
        f.context.beginPath();
        f.context.arc(f.graph_node_pos[node].x+left_padding , f.graph_node_pos[node].y,3,0,2*Math.PI);
        f.context.stroke();
    }
}
function erase_structure_canvas(f) {
    f.context.clearRect(0, 0, f_canvas.width, f_canvas.height);
}



function plot_lines(f) {
    let target_layer = 0;
    let num_nodes = f.num_nodes;
    for (let target = 1; target < num_nodes; target++ ) {
        target_layer = f.layer_of[target];
        for (let source = f.layer_start[target_layer-1]; source <= f.layer_stop[target_layer-1]; source++) {
            let magnitude = Math.abs(f.weight[target*num_nodes + source]);
            f.context.beginPath();
            f.context.lineWidth = 2*magnitude;
            f.context.strokeStyle="#777777";
            f.context.moveTo(f.graph_node_pos[source].x+left_padding , f.graph_node_pos[source].y);
            f.context.lineTo(f.graph_node_pos[target].x+left_padding , f.graph_node_pos[target].y);
            f.context.stroke();
        }
    }
}

function install_structure(nodes_in) {
    let bump  = 20;
    let num_layers = nodes_in.length;
    let graph_node_pos = [];
    let dx = f_canvas.width/(num_layers+1);
    let dy = 0;
    for (let layer = 0; layer <= num_layers; layer++) {
        if (nodes_in[layer] == 1) dy = 0; else dy = f_canvas.height/nodes_in[layer] - 10;
        let adjust = 0;
        for (let n = 0; n < nodes_in[layer]; n++) {
            graph_node_pos.push({x: (layer + 0.5)*dx, y: f_canvas.height/2 + adjust*dy});
            if ( n%2 == 0 ) adjust = Math.abs(adjust) + 1; else adjust *= -1;
        }
    }
    return graph_node_pos;
}

function plot_structure(f) {
    draw_structure_frame(f);
    plot_lines(f);
    plot_graph_nodes(f);
}
