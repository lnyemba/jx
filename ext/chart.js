/**
 * This is a charting wrapper, it is designed to simplify the interface to d3
 * dependencies:
 *  - jqplot.js     charting library http://d3js.org for documentation and more
 *  - utils.js  has utilities and design patterns used for internal purposes
 *  - dom.js    creates legend objects
 */

if(!jx){
    var jx = {}
}
jx.chart = {} ;


jx.jqplot = {}
/***
* adding dependencies and libraries in case they are overwhelming for users
* This
*/
jx.jqplot.init = function(){
        body = document.getElementsByTagName('head') ;

        if(body != null){
            body        = body [0]
            link        = jx.dom.get.instance('LINK') ;
            link.href   = 'https://the-phi.com/pub/js/jqplot/jqplot.css' ;
            link.rel    = 'stylesheet'
            link.type   = 'type/css'
            document.head.appendChild(link);
            var url     = [
                'https://the-phi.com/pub/js/jqplot/excanvas.js',
                'https://the-phi.com/pub/js/jqplot/jqplot.js',
                'https://the-phi.com/pub/js/jqplot/plugins/jqplot.mobile.js',
                'https://the-phi.com/pub/js/jqplot/plugins/jqplot.barRenderer.js',
                'https://the-phi.com/pub/js/jqplot/plugins/jqplot.donutRenderer.js',
                'https://the-phi.com/pub/js/jqplot/plugins/jqplot.categoryAxisRenderer.js',
                'https://the-phi.com/pub/js/jqplot/plugins/jqplot.canvasAxisLabelRenderer.js',
                'https://the-phi.com/pub/js/jqplot/plugins/jqplot.pointLabels.js',
                'https://the-phi.com/pub/js/jqplot/plugins/jqplot.canvasTextRenderer.js'
            ] ;
            // for(i in url){
            //     script = jx.dom.get.instance('SCRIPT') ;
            //     script.setAttribute('src',url[i]) ;
            //     script.language = 'javascript'
            //     document.head.appendChild(script)
            // }
            jx.utils.patterns.visitor(url,function(_url_){
                script = jx.dom.get.instance('SCRIPT') ;
                script.setAttribute('src',_url_) ;
                script.language = 'javascript'
                document.write(script.innerHTML)

                // document.head.appendChild(script)
            })

    }
}
jx.jqplot.line = {}
jx.jqplot.line.options= function(){
    var options = {
        series:[{showMarker:true}],
        grid:{
                drawGridLines:false,
                background:'white',
                borderColor:'white'
        },
        seriesDefaults:{
            rendererOptions: {
                smooth: true,
                animation: {
                    show: true
                }
            },
            pointLabels: {show: false}
        },
        axes:{
            xaxis:{
                tickOptions:{
                    showGridline: true
                },
                        // label:'Angle (radians)'

                renderer: $.jqplot.CategoryAxisRenderer,
                min:0,
                pad:2
            },
            yaxis:{
                    //  label:'Cosine'
                min:0,
                tickOptions:{
                    showGridline: false
                },
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer
            }
        },
        legend:{}
   } ;
   return options;
}
/**
* @id DOM identifier
* @series   matrix of values to be ploted
* @labels   xaxis labels
* @lnames   names of series (vectors in the matrix)
*/
jx.jqplot.line.render = function(id,series,labels,lnames){
    jx.dom.set.value(id,'')
    var options = jx.jqplot.line.options() ;
    options.axes.xaxis.ticks = labels ;
    if(series.length > 1){
        options.legend.show = true
        options.legend.location = 'ne'
        options.legend.placement = 'outsideGrid'
        options.series = lnames;
    }
    $.jqplot(id,series,options)
}


jx.jqplot.bar = {}
jx.jqplot.bar.options = function(){
    var options = {
        grid:{
            background:'white',
            drawGridLines:false,
            borderColor:'white'


        },
        seriesDefaults:{
              renderer:$.jqplot.BarRenderer,

              rendererOptions: {
                  highlightMouseDown: true,
                //   smooth: true,
                  animation: {
                      speed:900,
                      show: true
                  }

              },
              pointLabels: {show: true}
            },
            axes: {
                  xaxis: {
                      tickOptions:{
                                showGridline: false
                            },
                      renderer: $.jqplot.CategoryAxisRenderer,
                    //   ticks:labels,
                      showTickMarks:false,
                      pad:0
                  },
                  yaxis:{
                      tickOptions:{
                                showGridline: true
                            }
                  }

                },
                legend: {
                //   show: keys.length > 1,
                  location: 'ne',
                  xoffset:2,
                  placement: 'outsideGrid'
            }
      }
      return options;
}
/**
* Creating a bar chart (columns actually)
* @id DOM identifier
* @series   array of matrices of values (in the y-axis)
* @labels   x-axis labels
* @lnames   names of vectors in the series
*/
jx.jqplot.bar.render = function(id,series,labels,lnames){
    jx.dom.set.value(id,'')
    var options = jx.jqplot.bar.options()
    options.axes.xaxis.ticks = labels ;
    options.legend.show = true
    options.series = lnames;
    $.jqplot(id, series,options)

}
jx.jqplot.stackedBar = {}
jx.jqplot.stackedBar.options = jx.jqplot.bar.options ;
jx.jqplot.stackedBar.render = function(id,series,label,lnames){
    jx.dom.set.value(id,'')
    var options = jx.jqplot.stackedBar.options()
    options.axes.xaxis.ticks = labels ;
    options.legend.show = true

    options.series = lnames;
    options.stackSeries= true,
    // options.seriesDefaults.label = lnames[0];
    options.seriesDefaults.pointLabels.show= false;
    $.jqplot(id, series,options)

}

jx.jqplot.donut = {}
jx.jqplot.donut.options= function(){
    var options = {
        grid:{
            drawGridLines:false,
            background:'transparent',
            borderColor:'white'
        },

        seriesDefaults: {

            renderer:$.jqplot.DonutRenderer,
            rendererOptions:{
                // fill:false,
                sliceMargin: 3,
                startAngle: -90,
                showDataLabels: true,
                // dataLabels: 'value'
            }
        },
        legend: { show:true, location: 'e' }
    }
    return options;
}
/**
* @id   DOM identifier
* @series   vector of values
* @labels   labels of the values in the series
*/
jx.jqplot.donut.render = function(id,series){
    jx.dom.set.value(id,'')
    var options  = jx.jqplot.donut.options() ;
    $.jqplot(id,series,options)
}
