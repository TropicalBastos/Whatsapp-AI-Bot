<?php
//bypassing access control headers
  $baseUrl = "http://api.program-o.com/v2/chatbot/?bot_id=6&say=";
  $message = $_GET['message'];
  //$id = $_GET['convo_id'];
  $json = file_get_contents($baseUrl . $message);
  echo $json;

 ?>
