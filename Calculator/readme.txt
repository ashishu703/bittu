selection of phase is 1 = 230  230 + 2000 + 17.24 + 10  + 1 + 0.83 
length of cable  is 2000 in mtr = 2000;
length of cable  is 2000 in feet = 0.3048 * 2000;
wait
material if copper (res) = 17.24 else aluminium (res) = 28.264 = 
motor power if kilowatt then it is same as value (10=10)  else hp 0.746 *  value =  // else watt 0.001 * value =  ?

power factor 0.83 = ?
factor == if single = 1 and else for 2 & 3 = 1.732 = ?
effficiency is 0.83 =

// formuala                         
// full load current for single = power * 1000 / volt (230 ) * 0.83 (eff) * (powerfactor) 0.83
// full load current for double and = power * 1000 / 1.732 (factor) * volt(430) * 0.83 (eff) * (powerfactor) 0.83
// Result for User
// second formula 
// voltage drop  = single phase *  5 % (0.05)  (10/100)*230
// voltage drop = two or three phase * 5 %
// third Formula
// voltage resist factor = (single(1)/two or three(1.732)) * full load current * resistivity of material * length in mtr 
// size  factor = voltage resist factor / voltage drop = 
// second factor = if copper it will full load current divide by 5  else aluminum full load current  by 3
// comparsion  




if (($_REQUEST['phase'] == 'Other') && ($_REQUEST['motor'] == 'kw')) { ?>
    Result: $pow = $power*1000; $eff = 230 * 0.83 * 0.83 * 1; echo $pow / $eff;
    <?php
} 
else if (($_REQUEST['phase'] == 'Other') && ($_REQUEST['motor'] == 'hp') ){ 
    
      $val = 0.746 * $power; ?>

    <div class="">Result: <?php  $pow = $val*1000; $eff =  230  * 0.83 * 0.83 * 1; echo $pow / $eff;  ?></div>

    <?php

}  else if (($_REQUEST['phase'] == 'Other') && ($_REQUEST['motor'] == 'watt') ){
    
    $val = 0.001 * $power; ?>

    <div class="">Result: <?php  $pow = $val*1000; $eff =  230  * 0.83 * 0.83 * 1; echo $pow / $eff;  ?></div>

    <?php 

}  
        if (($_REQUEST['phase'] == '430') && ($_REQUEST['motor'] == 'kw') ){ ?>

    <div class="">Result: <?php  $pow = $power*1000; $eff =  430  * 1.732 * 0.83 * 0.83 * 1; echo $pow / $eff;  ?>
    </div>
    <?php
    
}
     else if (($_REQUEST['phase'] == '430') && ($_REQUEST['motor'] == 'hp')  ){
        $val = 0.746 * $power; ?>
    <div class="">Result: <?php  $pow = $val*1000; $eff =  430  * 1.732 * 0.83 * 0.83 * 1; echo $pow / $eff;  ?>
        <?php   

     }
    else if (($_REQUEST['phase'] == '430') && ($_REQUEST['motor'] == 'watt')){
        
        $val = 0.001 * $power; ?>

        <div class="">Result: <?php  $pow = $val*1000; $eff =  430  * 1.732 * 0.83 * 0.83 * 1; echo $pow / $eff;  ?>
        </div>
        <?php
    }


     /* } else {
                 result = document.getElementById('result').innerHTML = "Invalid Input ";;
} */
























  
        <select name="travel_arriveVia" id="travel_arriveVia" onchange="showfield(this.options[this.selectedIndex].value)">
        <option selected="selected">Please select ...</option>
        <option value="Plane">Plane</option>
        <option value="Train">Train</option>
        <option value="Own Vehicle">Own Vehicle</option>
        <option value="Other">Other</option>
        </select>
        <div id="div1"></div>

<script type="text/javascript">
        function showfield(name){
          if(name=='Other')document.getElementById('div1').innerHTML='Other: <input type="" name="other" value="456" readonly/>';
          else document.getElementById('div1').innerHTML='';
        }
        </script>