<?php

if(isset($_POST["date1"], $_POST["date2"])){
    $date1 = date_create($_POST["date1"]);
    $date2 = date_create($_POST["date2"]);
    $diff = date_diff($date1,$date2);
    $year = $diff->format("%r%y");
    $month = $diff->format("%r%m");
    $day = $diff->format("%r%d");
    $y = ((int) $year < 0) ? $year : 0;
    $m = ((int) $month < 0) ? $month : 0;
    $d = ( (int)$day < 0) ? $day : 0;
    if($y > 0 || $m > 0 || $d > 0){
        echo "not due";
    }else{
        $json = ["year" => abs($y), "month" => abs($m), "day" => abs($d)];
        header("content-type: application/json");
        echo json_encode($json);
    }
}