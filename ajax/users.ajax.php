<?php

    include "gestionRequeteBDD.ajax.php";
    // include "test.ajax.php";

    function getUsers() {
        $output = requeteBDD("SELECT * FROM users");
        $result = array();

        foreach($output as $res) {
            // array_push($result, $res);
            $result[$res["id"]] = $res["pseudo"];
        }
        
        print_r(json_encode($result));
    }

    function connect() {
        $username = $_POST["username"];
        $password = $_POST["password"];
        $result = array();

        $output = requeteBDD("SELECT * FROM users WHERE pseudo = '".$username."' or password = '".$password."'");

        // print_r($output);

        foreach($output as $res) {
            $result[$res["id"]]["pseudo"] = $res["pseudo"];
            $result[$res["id"]]["password"] = $res["password"];
            if(json_encode(password_verify($password, $res["password"]))) {
                echo json_encode(true);
                return;
            }
        }

        echo json_encode(false);

    }

    switch ($_GET["act"]) {
        case 'getUsers':
            getUsers();
            break;
        case 'Connect':
            connect();
            break;
        default:
            # code...
            break;
    }

?>