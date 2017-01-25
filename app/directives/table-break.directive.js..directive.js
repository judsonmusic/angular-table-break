angular.module('app')
    .directive('tableBreak', function ($compile, $timeout) {

        var _controller = ['$scope', function ($scope) {


        }];

        return {
            controller: _controller,
            scope:{},
            link: function (scope, element, attrs) {
                console.log(element);
                var mainHeaderHeight = 0;
                $timeout(function () {
                    if(attrs.header) {
                        mainHeaderHeight = $('.print-header-main').height();
                    }
                    console.log('The main header height is: ', mainHeaderHeight);

                    var pageCount = 1;
                    var header = "<header style='height:81px; -webkit-print-color-adjust: exact'>This is my running header for each page.</header>";
                    var footer = "<footer style='position:absolute; bottom: 0; left: 0; right: 0; height:81px; -webkit-print-color-adjust: exact'>This is my running footer for each page. PAGE: " + pageCount + "</footer>";

                    var printBoundsOuterHeight = 930 - mainHeaderHeight;
                    var printBoundsHeight = printBoundsOuterHeight - 182;
                    var className = attrs.class;
                    var thead = "<thead style='background-color: white;'>" + $(element[0].querySelectorAll('thead')).html() + "</thead>";
                    var theadH = $(element[0].querySelectorAll('thead')).height() || 0;
                    console.log(thead);
                    //printBoundsOuterHeight = printBoundsOuterHeight - mainHeaderHeight;


                    console.log('The green box is: ', printBoundsHeight);

                    $(element[0].querySelectorAll('thead')).remove();

                    var html = "<div class='print-bounds' style='height:" + printBoundsOuterHeight + "px'>" + header + "<div style='height:" + printBoundsHeight + "px; border: 1px solid green;'><table class='" + className + "'>" + thead + "<tbody>";
                    var currentHeight = 0;
                    var table = $(element)[0];
                    var matches = table.querySelectorAll('tr');

                    console.log(table);
                    console.log(matches);


                    [].forEach.call(matches, function (el, index) {

                        console.log('Hello world!');

                        //console.log('Current Height COming IN:', currentHeight);

                        currentHeight += $(el).height();
                        console.log(index + 1, currentHeight, printBoundsHeight)
                        //first check to see if we are going to pass the boundries by adding this element
                        if (currentHeight > (printBoundsHeight - theadH)) {
                            //console.log('WILL EXCEED!: ', index + 1, currentHeight, printBoundsHeight);
                            //we are going to exceed it, need to create new row for this guy...
                            mainHeaderHeight = 0;
                            printBoundsHeight = printBoundsOuterHeight - mainHeaderHeight - 162;
                            currentHeight = $(el).height();
                            pageCount++;
                            var header = "<header style='height:81px; -webkit-print-color-adjust: exact'>This is my running header for each page.</header>";
                            footer = "<footer style='position:absolute; bottom: 0; left: 0; right: 0; height:81px; -webkit-print-color-adjust: exact'>This is my running footer for each page. PAGE: " + pageCount++ + "</footer>";
                            html += "</tbody></table></div>" + footer + "</div><div class='print-bounds' style='height:" + 930 + "px'>" + header + "<div style='height:" + printBoundsHeight + "px; border: 1px solid green;'><table class='" + className + "'>" + thead + "<tbody>" + "<tr>" + $(el).html() + "</tr>";

                        } else {
                            //console.log('THIS ONE WILL NOT ***EXCEED THE BOUNDARY!, ', index + 1, currentHeight, printBoundsHeight);
                            html += '<tr>' + $(el).html() + '</tr>';
                            //currentHeight += $(el).height();
                        }

                    });

                    html += "</tbody></table></div>" + footer + "</div>";
                    var e = $compile(html)(scope);
                    element.replaceWith(e);

                }, 1000);
            }
        }


    });