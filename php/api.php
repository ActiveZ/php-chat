<?php
//fichier sur le serveur
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTION');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Headers: application/json');

require_once 'bdd.php';
// require_once 'bdd' . DIRECTORY_SEPARATOR . 'bdd.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if ($_POST['action'] === 'getMessages') {
    $req = $pdo->prepare('SELECT * FROM chatCnam ORDER BY dateTimestamp DESC LIMIT 0,100');
    $req->execute();
    $data = $req->fetchAll();

    echo json_encode($data);
}


elseif ($_POST['action'] === 'sendMessages') {
    //$date = new DateTime();
    $req = $pdo->prepare('INSERT INTO chatCnam (pseudo, message) VALUES (:pseudo, :message)'); // date générée par bdd
    // $req = $pdo->prepare('INSERT INTO chatCnam (pseudo, message, dateTimestamp) VALUES (:pseudo, :message, :dateTimestamp)');
    $req->execute([
        'pseudo' => $_POST['pseudo'],
        'message' => $_POST['message'],
        // 'dateTimestamp' => $date->getTimestamp()
    ]);
}
?>