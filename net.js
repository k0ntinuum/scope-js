function random_vector(n,a,b) {
    let v = [];
    for (let i = 0; i < n; i++) {
        v.push(a+ (b-a)*Math.random());
    }
    return v;
}
function random_network_structure() {
    let number_of_layers = rant(4,13);
    let network_structure = [];
    for (let layer = 0 ; layer < number_of_layers; layer++) {
        if (layer ==0 || layer == number_of_layers - 1) {
            network_structure.push(1);
        } else {
            network_structure.push(2*rant(1,6) + 3);
        }
    }
    return network_structure;
}

function zero_vector(n,a,b) {
    let v = [];
    for (let i = 0; i < n; i++) {
        v.push(0);
    }
    return v;
} 

function layer_of(nodes_in) {
    let result = [];
    for (let layer = 0; layer < nodes_in.length; layer++ ) {
        for (let node = 0; node < nodes_in[layer]; node++ ) {
            result.push(layer);
        }
    }
    return result;
}

function layer_start(layer_of) {
    let result = [];let node = 0;
    let num_layers = layer_of[layer_of.length-1] + 1;
    for (let layer = 0; layer < num_layers; layer++) {
        node = 0;
        while(layer_of[node] < layer && node < layer_of.length) node++;
        result.push(node);
    }
    return result;
}

function layer_stop(layer_of) {
    let result = [];let node = 0;
    let num_layers = layer_of[layer_of.length-1] + 1;
    for (let layer = 0; layer < num_layers; layer++) {
        node = 0;
        while(layer_of[node] <= layer && node < layer_of.length) node++;
        result.push(node - 1);
    }
    return result;
}
function random_activation_vector(num_layers) {
    let act = [];
    for (let i = 0; i < num_layers; i++) {
        if (Math.random() >= .5) {
            act.push("relu");
        } else {
            act.push("tanh");
        }
    }
    return act;
}

function new_net(nodes_in) {
    let new_layer_of = layer_of(nodes_in);
    let new_num_nodes = nodes_in.reduce((a,b)=>a+b, 0);
    let new_num_layers = nodes_in.length;
    let default_activations = new Array(new_num_layers).fill("tanh");
    default_activations[0] = "linear";
    default_activations[new_num_layers-1] = "linear";

    return {
        num_nodes: new_num_nodes,
        num_layers : new_num_layers,
        layer_of : new_layer_of,
        nodes_in : nodes_in,
        layer_start : layer_start(new_layer_of),
        layer_stop : layer_stop(new_layer_of),
        activation_of : default_activations,
        value : new Array(new_num_nodes).fill(0),
        delta: new Array(new_num_nodes).fill(0),
        memory : new Array(new_num_nodes).fill(0),
        weight : random_vector(new_num_nodes*new_num_nodes, -1.0,1.0),
        bias : new Array(new_num_nodes).fill(0),
        rate : 0.001,
        graph_node_pos : install_structure(nodes_in),
        color : "#FF0000",
        context : pencil,
    }
}

function forward(f,x) {
    let target_layer = 0;
    f.value[0] = x;
    let num_nodes = f.num_nodes;
    for (let target = 1; target < num_nodes; target++ ) {
        f.value[target] = f.bias[target];
        target_layer = f.layer_of[target];
        for (let source = f.layer_start[target_layer-1]; source <= f.layer_stop[target_layer-1]; source++) {
            f.value[target] += f.weight[num_nodes*target + source]*f.value[source];
        }
        switch (f.activation_of[target_layer]) {
            case "linear" : f.memory[target] = 1.0; 
                            break;
            case "relu"   : f.value[target] = f.value[target] > 0 ? f.value[target] : 0; 
                            f.memory[target] = (f.value[target] > 0 ? 1.0 : 0.0);
                            break;
            case "tanh"   : f.value[target] = Math.tanh(f.value[target]);
                            f.memory[target] = 1 - f.value[target]*f.value[target]; 
                            break;
        }
    }
    let raw = f.value[num_nodes-1];
    return raw;
}

function backprop(f,x) {
    let num_nodes = f.num_nodes;
    let source_layer = 0;
    f.delta[num_nodes - 1] = x;
    for (let source = num_nodes - 2; source >= 0; source-- ) {
        source_layer = f.layer_of[source];
        f.delta[source] = 0;
        for (let target = f.layer_start[source_layer+1]; target <= f.layer_stop[source_layer+1]; target++) {
            f.delta[source] += f.weight[target*num_nodes+source]*f.memory[target]*f.delta[target];
        }
    }
    for (let source = num_nodes - 2; source > 0; source-- ) {
        source_layer = f.layer_of[source];
        f.bias[source] -= f.rate*f.delta[source]*f.memory[source];
        for (let target = f.layer_start[source_layer+1]; target <= f.layer_stop[source_layer+1]; target++) {
            f.weight[target*num_nodes+ source] -= f.rate*f.memory[source]*f.delta[source]*f.value[target];
        }
    }
}


function backprop_over_points(f) {
    let squared_error = 0;
    for(let j = 0; j < 100; j++) {
        for (let i = 0; i < data.length ; i++) {
            let x = data[i].x;
            let error = forward(f,x)-data[i].y;
            backprop(f, error);
            squared_error += error*error;
        }
    }
    return 0.5*squared_error;
}

function random_input() {
    return (max_x_value - min_x_value)*Math.random() + min_x_value;
}



function rant(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function clean(f,max) {
    for (let i = 0; i < f.weight.length; i++) {
        if (f.weight[i] > max) {
            f.weight[i] = max;
        } else {
            if (-f.weight[i] < -max) f.weight[i] = -max;
        }
    }
    for (let i = 0; i < f.bias.length; i++) {
        if (f.bias[i] > max) {
            f.bias[i] = max;
        } else {
            if (-f.bias[i] < -max) f.bias[i] = -max;
        }
    }

}

function randomizeWeights() {
    f.weight = random_vector(f.num_nodes*f.num_nodes, -0.5,0.5);
    f.bias = random_vector(f.num_nodes*f.num_nodes, -0.001,0.001);
}



