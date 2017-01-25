angular.module('app')
    .directive('tableBreak', function ($compile, $timeout) {

        var _controller = ['$scope', function ($scope) {


        }];

        return {
            controller: _controller,
            link: function (scope, element, attrs) {

                $timeout(function () {

                    var pageCount = 1;
                    var footer = "<footer style='position:absolute; bottom: 0; left: 0; right: 0; height:81px; background-color: grey; -webkit-print-color-adjust: exact'>This is my running footer for each page. PAGE: " + pageCount + "</footer>";
                    var header = "<header style='height:81px; background-color: #336699; -webkit-print-color-adjust: exact'>This is my running header for each page. PAGE: " + pageCount + "</header>";


                    var printBoundsHeight = 600;
                    var className = attrs.class;
                    var thead = "<thead style='background-color: white;'>" + $(element[0].querySelectorAll('thead')).html() + "</thead>";
                    var theadH = $(element[0].querySelectorAll('thead')).height() || 0;


                    $(element[0].querySelectorAll('thead')).remove();

                    var html = "<div class='print-bounds'>" + header + "<table class='"+ className +"'>" + thead + "<tbody>";

                    var currentHeight = 0;

                    element[0].querySelectorAll('tr').forEach(function(el, index){

                        currentHeight += $(el).height();

                        //first check to see if we are going to pass the boundries by adding this element.

                        if(currentHeight > printBoundsHeight){
                            console.log('THIS ONE WILL EXCEED THE BOUNDARY!, ', index+1, currentHeight, printBoundsHeight);
                            //we are going to exceed it, need to create new row for this guy...
                            currentHeight = 0;
                            footer = "<footer style='position:absolute; bottom: 0; left: 0; right: 0; height:81px; background-color: grey; -webkit-print-color-adjust: exact'>This is my running footer for each page. PAGE: " + pageCount++ + "</footer>";
                            html += "</tbody></table>" + footer + "</div><div class='print-bounds'>" + header + "<table class='"+className +"'>" + thead + "<tbody>" + "<tr>" + $(el).html() + "</tr>";

                        }else{
                            console.log('THIS ONE WILL NOT ***EXCEED THE BOUNDARY!, ', index+1, currentHeight, printBoundsHeight);
                            html += '<tr>' + $(el).html() + '</tr>';
                            //currentHeight += $(el).height();
                        }




                    });

                    html += "</tbody></table>" + footer + "</div>";
                    var e = $compile(html)(scope);
                    element.replaceWith(e);

                }, 100);
            }
    }


    });