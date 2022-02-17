import React, {useEffect} from 'react'
import $ from "jquery"
const LineTest = () => {

    const drag = (eTarget) => {
        eTarget.target.addEventListener(
          "dragover",
          function (e) {
            e = e || window.event;
            var dragX = e.pageX,
              dragY = e.pageY;

            console.log("X: " + dragX + " Y: " + dragY);
          },
          false
        );

        //  jQuery

        $("div").bind("dragover", function (e) {
          var dragX = e.pageX,
            dragY = e.pageY;

          console.log("X: " + dragX + " Y: " + dragY);
        });
    }
    
  return (
    <div onDrag={drag}>LineTest</div>
  )
}

export default LineTest