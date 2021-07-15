import data from './data'
const { $jit } = window

// level distance
var levelDistance = 250

// default line width
var defaultLineWidth = 0.3
// default line color
var defaultLineColor = '#23a4ff'

// default node dimension
var defaultNodeDimension = 8
// default node color
var defaultNodeColor = '#FFF'

// highlight line width
var highlightLineWidth = 4
// highlight line color
var highlightLineColor = '#36acfb'
// highlight node dimension
var highlightNodeDimension = 9

// animation speed of line highlighting (ms)
var lineHighlightFxSpeed = 200

// initial animation speed (ms)
var initialFxSpeed = 500

// zooming magnifier for mouse scroll wheel
var zoomFxSpeed = 100

// background concentric circle color
var backgroundCircleColor = '#dedede'

// rendering frames per second
var renderFPS = 60

// node list browser title
var nodeListBrowserTitle = ''

// node list link text
var nodeListLinkText = ''

// work stream browser title
var workStreamBrowserTitle = ''

// work stream link text
var workStreamLinkText = ''

var labelType,
  useGradients,
  nativeTextSupport,
  animate,
  nodeListBrowserTitle,
  nodeListLinkText
function getJSONValues(json, activeNode) {
  let values = []
  let index = 0

  for (let i in json) values.push(json[i])

  for (let i in values) {
    if (activeNode && values[i].id === activeNode.id) {
      index = i
    }
  }

  return [values, index]
}

;(function () {
  var ua = navigator.userAgent,
    iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
    typeOfCanvas = typeof HTMLCanvasElement,
    nativeCanvasSupport =
      typeOfCanvas === 'object' || typeOfCanvas === 'function',
    textSupport =
      nativeCanvasSupport &&
      typeof document.createElement('canvas').getContext('2d').fillText ==
        'function'
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType =
    !nativeCanvasSupport || (textSupport && !iStuff) ? 'Native' : 'HTML'
  nativeTextSupport = labelType === 'Native'
  useGradients = nativeCanvasSupport
  animate = !(iStuff || !nativeCanvasSupport)
})()

if (typeof nodeListBrowserTitle === 'undefined') {
  nodeListBrowserTitle = 'Node List'
}

if (typeof nodeListLinkText === 'undefined') {
  nodeListLinkText = 'Node List'
}

if (typeof workStreamBrowserTitle === 'undefined') {
  workStreamBrowserTitle = 'Work Stream Inventory'
}

if (typeof workStreamLinkText === 'undefined') {
  workStreamLinkText = 'Work Stream Inventory'
}

var nodeListLink =
  '<a href="nodelist.html" target="' +
  nodeListBrowserTitle +
  '" >' +
  nodeListLinkText +
  '</a>'
var workStreamLink =
  '<a href="work-stream-inv.html" target="' +
  workStreamBrowserTitle +
  '" >' +
  workStreamLinkText +
  '</a>'

export default function init(json, setActiveNode, level, activeNode) {
  $jit.RGraph.Plot.NodeTypes.implement({
    image: {
      render: function (node, canvas) {
        const ctx = canvas.getCtx()
        const pos = node.pos.getc(true)

        if (node.getData('image') !== 0) {
          const img = node.getData('image')

          let w = node.getData('imagewidth')
          let h = node.getData('imageheight')
          const r = 35 / h // Scaling factor to scale images to 35px height
          w = r * w
          h = r * h

          if (node._depth <= level) {
            ctx.drawImage(img, 0, 0, 0, 0)
          }
        }
      },
      // contains: function (node, pos) {
      //   var npos = node.pos.getc().$scale(node.scale)
      //   var h = node.getData('imageheight')
      //   var w = node.getData('imagewidth')
      //   return this.nodeHelper.rectangle.contains(npos, pos, w, h)
      // },
    },
  })

  //init RGraph
  var rgraph = new $jit.RGraph({
    //Where to append the visualization

    injectInto: 'navigator',
    //Optional: create a background canvas that plots
    //concentric circles.
    background: {
      CanvasStyles: {
        strokeStyle: backgroundCircleColor,
      },
    },
    //Add navigation capabilities:
    //zooming by scrolling and panning.
    Navigation: {
      enable: true,
      panning: 'avoid nodes',
      zooming: zoomFxSpeed,
    },
    //Set Node and Edge styles.
    Node: {
      overridable: true,
      color: defaultNodeColor,
      dim: defaultNodeDimension,
    },

    Edge: {
      overridable: true,
      color: defaultLineColor,
      lineWidth: defaultLineWidth,
    },

    iterations: 200,

    levelDistance: levelDistance,

    Events: {
      enable: true,
      type: 'Native',
      //Change cursor style when hovering a node
      onMouseEnter: function () {
        rgraph.canvas.getElement().style.cursor = 'move'
      },
      onMouseLeave: function () {
        rgraph.canvas.getElement().style.cursor = ''
      },
      //Update node positions when dragged
      onDragMove: function (node, eventInfo, e) {
        var pos = eventInfo.getPos()
        node.pos.setc(pos.x, pos.y)
        rgraph.plot()
      },
      //Implement the same handler for touchscreens
      onTouchMove: function (node, eventInfo, e) {
        $jit.util.event.stop(e) //stop default touchmove event
        this.onDragMove(node, eventInfo, e)
      },
    },

    onBeforeCompute: function (node) {
      //Add the relation list in the right column.
      //This list is taken from the data property of each JSON node.
      // $jit.id('inner-details').innerHTML = 'loading...';
    },

    //Add the name of the node in the correponding label
    //and a click handler to move the graph.
    //This method is called once, on label creation.
    onCreateLabel: function (domElement, node) {
      var nameContainer = document.createElement('span')
      const image = document.createElement('img')
      nameContainer.className = 'name'
      if (
        typeof node.data !== 'undefined' &&
        typeof node.data.URL !== 'undefined'
      ) {
        nameContainer.title +=
          '<a href="' +
          node.data.URL +
          '" target=_blank>' +
          node.name +
          '</a><br/><br/>'
        nameContainer.className = 'name tt'
      }
      if (
        typeof node.data !== 'undefined' &&
        typeof node.data.description !== 'undefined'
      ) {
        nameContainer.title += node.data.description
        nameContainer.className = 'name tt'
      }
      nameContainer.innerHTML = node.name
      if (node.data.group === 'asset') {
        nameContainer.setAttribute(
          'style',
          'color: black; width: 130px; text-overflow: ellipsis; text-align: center; overflow: hidden; white-space: nowrap;'
        )
        domElement.setAttribute(
          'style',
          'position: absolute; align-items: center; border-radius: 15px;'
        )
      }
      if (node.data.group === 'activity') {
        nameContainer.setAttribute(
          'style',
          'color: black; width: 130px; text-overflow: ellipsis; text-align: center; overflow: hidden; white-space: nowrap;'
        )
        domElement.setAttribute(
          'style',
          'position: absolute; align-items: center; border-radius: 15px;'
        )
      }
      if (node.data.group === 'setting') {
        nameContainer.setAttribute('style', 'color: white; margin-left: 5px;')
        domElement.setAttribute(
          'style',
          'position: absolute; cursor:pointer; align-items: center; border-radius: 15px; padding: 5px 10px; background:#786cba;'
        )
        image.setAttribute('style', 'height: 15px')
        image.src = 'setting.svg'
      } else if (node.data.group === 'process') {
        nameContainer.setAttribute('style', 'color: white; margin-left: 5px;')
        domElement.setAttribute(
          'style',
          'position: absolute; cursor:pointer; align-items: center; border-radius: 15px;  padding: 5px 10px; background: #ce5685;'
        )
        image.setAttribute('style', 'height: 15px')
        image.src = 'process.svg'
      } else if (node.data.group === 'resources') {
        nameContainer.setAttribute('style', 'color: white; margin-left: 5px;')
        domElement.setAttribute(
          'style',
          'position: absolute; cursor:pointer; align-items: center; border-radius: 15px;  padding: 5px 10px; background: #0084ad;'
        )
        image.setAttribute('style', 'height: 15px')
        image.src = 'asset.svg'
      } else if (node.data.group === 'subject') {
        nameContainer.setAttribute('style', 'color: white; margin-left: 5px;')
        domElement.setAttribute(
          'style',
          'position: absolute; cursor:pointer; align-items: center; border-radius: 15px; padding: 5px 10px; background: #ff8c40;'
        )
        image.setAttribute('style', 'height: 15px')
        image.src = 'subject.svg'
      } else if (node.data.group === 'navigator') {
        nameContainer.setAttribute('style', 'color: white; margin-left: 5px;')
        domElement.setAttribute(
          'style',
          'position: absolute; cursor:pointer; align-items: center; border-radius: 15px; padding: 5px 10px; background:#01838f;'
        )
        image.setAttribute('style', 'height: 15px')
        image.src = 'navigator.svg'
      }
      // nameContainer.parentElement.setAttribute('style', 'padding-bottom: 20px')
      domElement.appendChild(image)
      domElement.appendChild(nameContainer)
      node.setData('dim', defaultNodeDimension)
      //            var wiggle = 0;
      node.eachAdjacency(function (a) {
        if (a.nodeTo.endPos.getp().rho > 0) {
          a.setDataset('end', {
            lineWidth: defaultLineWidth,
            color: defaultLineColor,
          })
        }
      })
      var obj = rgraph.getNodeAndParentAngle(node.id)

      if (obj.parent) {
        // var thetaDiff = node.endPos.getp().theta * 1.01;
        // node.endPos.set(node.endPos.getp().add(new $jit.Polar(thetaDiff, 0)));
      }

      //Toggle a node selection when clicking
      //its name. This is done by animating some
      //node styles like its dimension and the color
      //and lineWidth of its adjacencies.
      nameContainer.onclick = function () {
        rgraph.onClick(node.id, {
          hideLabels: false,
          onComplete: function () {
            //set final styles
            rgraph.graph.eachNode(function (n) {
              if (n.id !== node.id) delete n.selected
              n.setData('dim', defaultNodeDimension, 'end')
              n.eachAdjacency(function (adj) {
                adj.setDataset('end', {
                  lineWidth: defaultLineWidth,
                  color: defaultLineColor,
                })
              })
            })
            if (!node.selected) {
              node.selected = true
              node.setData('dim', highlightNodeDimension, 'end')
              node.eachAdjacency(function (adj) {
                adj.setDataset('end', {
                  lineWidth: highlightLineWidth,
                  color: highlightLineColor,
                })
              })
              setActiveNode(node)
            } else {
              delete node.selected
            }
            //trigger animation to final styles
            rgraph.fx.animate({
              modes: [
                rgraph.config.interpolation,

                'node-property:dim',
                'edge-property:lineWidth:color',
              ],
              duration: lineHighlightFxSpeed,
            })
            // Build the right column relations list.
            // This is done by traversing the clicked node connections.
            var html = '',
              list = []
            if (
              typeof node.data !== 'undefined' &&
              typeof node.data.URL !== 'undefined'
            ) {
              html =
                '<div id="sitelink"><h4><a href="' +
                node.data.URL +
                '" target=_blank>' +
                node.name +
                '</a></h4></div>'
            }
          },
        })
      }
    },
    //Change some label dom properties.
    //This method is called each time a label is plotted.
    onPlaceLabel: function (domElement, node) {
      var style = domElement.style
      if (
        typeof level === 'undefined' ||
        level === 'all' ||
        node._depth <= level
      ) {
        var left = parseInt(style.left)
        var top = parseInt(style.top)
        var w = domElement.offsetWidth
        if (node.data.group === 'asset' || node.data.group === 'activity') {
          style.left = left - 65 + 'px'
        } else {
          style.left = left - w / 2 + 'px'
        }
        style.top = top - 25 + 'px'
        style.display = 'flex'
        style.cursor = 'pointer'
      } else {
        style.display = 'none'
      }
    },
  })

  function loadImages() {
    rgraph.graph.eachNode(function (node) {
      if (node.getData('type') === 'image') {
        var img = new Image()
        img.addEventListener(
          'load',
          function () {
            node.setData('image', img) // store this image object in node
            node.setData('imageheight', this.height)
            node.setData('imagewidth', this.width)
          },
          false
        )
        img.src = node.getData('url')
      }
    })
  }

  //load JSON data
  rgraph.loadJSON(...getJSONValues(json, activeNode))
  // //load images in node
  loadImages()
  //trigger small animation

  rgraph.graph.eachNode(function (n) {
    var pos = n.getPos()
    pos.setc(0, 0)
  })
  rgraph.compute('end')
  rgraph.fx.animate({
    fps: renderFPS,
    modes: [
      rgraph.config.interpolation,
      'node-property:dim',
      'edge-property:lineWidth:color',
    ],
    duration: initialFxSpeed,
    hideLabels: false,
    onComplete: function () {},
  })

  function zoom(delta) {
    if (rgraph) {
      var val = rgraph.controller.Navigation.zooming
      var ans = 1 - delta * val
      rgraph.canvas.scale(ans, ans)
    }
  }

  var butZoomOff = $jit.id('zoomOff')
  butZoomOff.onclick = function () {
    zoom(0.001)
  }

  var butZoomIn = $jit.id('zoomIn')
  butZoomIn.onclick = function () {
    zoom(-0.001)
  }

  var hide1 = $jit.id('Setting')
  hide1.onclick = function () {
    const li = document.getElementById('Setting')
    const names = [
      'setting',
      'longtermcare',
      'postacutecare',
      'laboratoryenv',
      'acute',
      'ambulatory',
      'telemedicine',
      'home',
    ]
    const childs = []
    names.forEach((item) => {
      if (getNode(item)) childs.push(getNode(item))
    })
    const error = childs.filter((item) => item.selected)

    if (
      error.length === 0 &&
      !names.includes(li.getAttribute('activenode')) &&
      !names.includes(li.getAttribute('opennednode')) &&
      checkLastChild(li.getAttribute('id').toLowerCase()).length !== 0
    ) {
      hideNodes(li.getAttribute('id'), {
        setting: li.getAttribute('caresettingsvis'),
        process: li.getAttribute('careprocessvis'),
        subject: li.getAttribute('subjectvis'),
        resource: li.getAttribute('resourcevis'),
      })
    }
  }
  var hide2 = $jit.id('Process')
  hide2.onclick = function () {
    const li = document.getElementById('Process')
    const names = [
      'process',
      'followup',
      'treatment',
      'diagnosis',
      'trial',
      'screening',
      'prevention',
      'trial',
    ]
    const childs = []
    names.forEach((item) => {
      if (getNode(item)) childs.push(getNode(item))
    })
    const error = childs.filter((item) => item.selected)

    if (
      error.length === 0 &&
      !names.includes(li.getAttribute('activenode')) &&
      !names.includes(li.getAttribute('opennednode')) &&
      checkLastChild(li.getAttribute('id').toLowerCase()).length !== 0
    ) {
      hideNodes(li.getAttribute('id'), {
        setting: li.getAttribute('caresettingsvis'),
        process: li.getAttribute('careprocessvis'),
        subject: li.getAttribute('subjectvis'),
        resource: li.getAttribute('resourcevis'),
      })
    }
  }
  var hide3 = $jit.id('Subject')
  hide3.onclick = function () {
    const li = document.getElementById('Subject')
    const names = [
      'subject',
      'caremgmt',
      'diagnoses',
      'diagnostics',
      'features',
      'resmgmt',
      'ppe',
      'logistics',
      'comorb',
      'specpop',
      'therapeuticsandprevention',
      'control',
      'epid',
      'cliepid',
      'pubhealthcaserep',
      'subjectreserch',
      'ethics',
    ]
    const childs = []
    names.forEach((item) => {
      if (getNode(item)) childs.push(getNode(item))
    })
    const error = childs.filter((item) => item.selected)

    if (
      error.length === 0 &&
      !names.includes(li.getAttribute('activenode')) &&
      !names.includes(li.getAttribute('opennednode')) &&
      checkLastChild(li.getAttribute('id').toLowerCase()).length !== 0
    ) {
      hideNodes(li.getAttribute('id'), {
        setting: li.getAttribute('caresettingsvis'),
        process: li.getAttribute('careprocessvis'),
        subject: li.getAttribute('subjectvis'),
        resource: li.getAttribute('resourcevis'),
      })
    }
  }
  var hide4 = $jit.id('Resource')
  hide4.onclick = function () {
    const li = document.getElementById('Resource')
    const names = [
      'resource',
      'datavis',
      'datacol',
      'knowledge',
      'list',
      'activity',
      'guidelines',
      'rules',
      'model',
      'policy',
      'workflow',
      'recommend',
      'research',
      'authoring',
      'implementation',
      'collaboration',
    ]
    const childs = []
    names.forEach((item) => {
      if (getNode(item)) childs.push(getNode(item))
    })
    const error = childs.filter((item) => item.selected)
    if (
      error.length === 0 &&
      !names.includes(li.getAttribute('activenode')) &&
      !names.includes(li.getAttribute('opennednode')) &&
      checkLastChild(li.getAttribute('id').toLowerCase()).length !== 0
    ) {
      hideNodes(li.getAttribute('id'), {
        setting: li.getAttribute('caresettingsvis'),
        process: li.getAttribute('careprocessvis'),
        subject: li.getAttribute('subjectvis'),
        resource: li.getAttribute('resourcevis'),
      })
    }
  }

  const getNode = (name) => {
    if (Array.isArray(name)) {
      return name.filter((item) => rgraph.graph.getNode(item))
    } else {
      return rgraph.graph.getNode(name)
    }
  }

  const checkLastChild = (label) => {
    let array = ['setting', 'process', 'subject', 'resource']
    let index = array.indexOf(label)
    if (index > -1) {
      array.splice(index, 1)
    }
    return getNode(array)
  }

  const checkVisibility = (label, visibility) => {
    const arr = []
    const keys = Object.keys(visibility)
    keys.forEach((key) => {
      if (visibility[key] === 'false') arr.push(key)
    })
    if (label === 'Setting') {
      let index = arr.indexOf('setting')
      if (index > -1) {
        arr.splice(index, 1)
      }
      if (visibility.setting === 'true') {
        return { visible: false, array: arr }
      } else {
        return { visible: true, array: arr }
      }
    } else if (label === 'Process') {
      let index = arr.indexOf('process')
      if (index > -1) {
        arr.splice(index, 1)
      }
      if (visibility.process === 'true') {
        return { visible: false, array: arr }
      } else {
        return { visible: true, array: arr }
      }
    } else if (label === 'Subject') {
      let index = arr.indexOf('subject')
      if (index > -1) {
        arr.splice(index, 1)
      }
      if (visibility.subject === 'true') {
        return { visible: false, array: arr }
      } else {
        return { visible: true, array: arr }
      }
    } else if (label === 'Resource') {
      let index = arr.indexOf('resource')
      if (index > -1) {
        arr.splice(index, 1)
      }
      if (visibility.resource === 'true') {
        return { visible: false, array: arr }
      } else {
        return { visible: true, array: arr }
      }
    }
  }

  const hideNodes = (label, visibility) => {
    const vis = checkVisibility(label, visibility)
    if (vis.visible) {
      rgraph.loadJSON(...getJSONValues(json, activeNode))

      loadImages()
      rgraph.graph.eachNode(function (n) {
        var pos = n.getPos()
        pos.setc(0, 0)
      })
      rgraph.compute('end')
      rgraph.fx.animate({
        fps: renderFPS,
        modes: [
          rgraph.config.interpolation,
          'node-property:dim',
          'edge-property:lineWidth:color',
        ],
        duration: initialFxSpeed,
        hideLabels: false,
        onComplete: function () {},
      })
      vis.array.forEach((item) => {
        const node = rgraph.graph.getNode(item)

        if (!node || node.selected) {
          return
        } else {
          const subnodes = node.getSubnodes(0)
          const map = []
          const keys = Object.keys(data)
          for (var i = 0; i < subnodes.length; i++) {
            if (keys.includes(subnodes[i].name)) {
              map.push(subnodes[i].id)
            }
          }
          //perform node-removing animation.
          rgraph.op.removeNode(map.reverse(), {
            type: 'replot',
            modes: [rgraph.config.interpolation],
            duration: initialFxSpeed,
            fps: renderFPS,
            hideLabels: true,
          })
        }
      })
    } else {
      const node = rgraph.graph.getNode(label.toLowerCase())

      if (!node || node.selected) {
        return
      } else {
        const subnodes = node.getSubnodes(0)
        const map = []
        const keys = Object.keys(data)
        for (var i = 0; i < subnodes.length; i++) {
          if (keys.includes(subnodes[i].name)) {
            map.push(subnodes[i].id)
          }
        }
        //perform node-removing animation.
        rgraph.op.removeNode(map.reverse(), {
          type: 'replot',
          modes: [rgraph.config.interpolation],
          duration: initialFxSpeed,
          fps: renderFPS,
          hideLabels: true,
        })
      }
    }
  }
}
