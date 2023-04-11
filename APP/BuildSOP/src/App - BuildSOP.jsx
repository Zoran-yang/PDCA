import { useState, useEffect } from 'react'
import { Graph } from '@antv/x6';
import { Shape } from '@antv/x6'
import CreateSOP from "./CreateSOP"
import FloatingWindow from './floatingWindows';


const data = {
  // 节点
  nodes: [
    {
      id: 'Writing Code', // String，可选，节点的唯一标识
      x: 10,       // Number，必选，节点位置的 x 值
      y: 175,       // Number，必选，节点位置的 y 值
      width: 70,   // Number，可选，节点大小的 width 值
      height: 50,  // Number，可选，节点大小的 height 值
      zIndex: 10,
      label: 'Writing Code', // String，节点标签
    },
    {
      id: 'Planning', // String，可选，节点的唯一标识
      x: 100,       // Number，必选，节点位置的 x 值
      y: 10,       // Number，必选，节点位置的 y 值
      width: 90,   // Number，可选，节点大小的 width 值
      height: 380, 
      attrs: {
        label: {
          text: 'Writing Code',
          refY: 0.05,
        },
      }, // String，节点标签
      data: {
        parent: true,
      },
    },
    {
      id: 'Doing', // String，节点的唯一标识
      x: 200,       // Number，必选，节点位置的 x 值
      y: 10,       // Number，必选，节点位置的 y 值
      width: 90,   // Number，可选，节点大小的 width 值
      height: 380,   // Number，可选，节点大小的 height 值
      attrs: {
        label: {
          text: 'Doing',
          refY: 0.05,
        },
      }, // String，节点标签
      data: {
        parent: true,
      },
    },
    {
      id: 'Checking', // String，节点的唯一标识
      x: 300,       // Number，必选，节点位置的 x 值
      y: 10,       // Number，必选，节点位置的 y 值
      width: 90,   // Number，可选，节点大小的 width 值
      height: 380,   // Number，可选，节点大小的 height 值
      attrs: {
        label: {
          text: 'Checking',
          refY: 0.05,
        },
      }, // String，节点标签
      data: {
        parent: true,
      },
    },
    {
      id: 'Action', // String，节点的唯一标识
      x: 400,       // Number，必选，节点位置的 x 值
      y: 10,       // Number，必选，节点位置的 y 值
      width: 90,   // Number，可选，节点大小的 width 值
      height: 380,   // Number，可选，节点大小的 height 值
      attrs: {
        label: {
          text: 'Action',
          refY: 0.05,
        },
      }, // String，节点标签
    },
    {
      id: 'Plan code constructure', // String，可选，节点的唯一标识
      x: 105,       // Number，必选，节点位置的 x 值
      y: 250,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 100, 
      attrs: {
        label: {
          text: 'Plan code constructure',
        },
      }, // String，节点标签
    },
    {
      id: 'Notice', // String，可选，节点的唯一标识
      x: 205,       // Number，必选，节点位置的 x 值
      y: 250,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 100, 
      attrs: {
        label: {
          text: 'Notice',
        },
      }, // String，节点标签
    },
    {
      id: 'Review result', // String，可选，节点的唯一标识
      x: 305,       // Number，必选，节点位置的 x 值
      y: 250,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 100, 
      attrs: {
        label: {
          text: 'Review result',
        },
      }, // String，节点标签
    },
    {
      id: 'Revise SOP', // String，可选，节点的唯一标识
      x: 405,       // Number，必选，节点位置的 x 值
      y: 250,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 100, 
      attrs: {
        label: {
          text: 'Revise SOP',
        },
      }, // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'Writing Code', // String，必须，起始节点 id
      target: 'Plan code constructure', // String，必须，目标节点 id
    },
    {
      source: 'Plan code constructure', // String，必须，起始节点 id
      target: 'Notice', // String，必须，目标节点 id
    },
    {
      source: 'Notice', // String，必须，起始节点 id
      target: 'Review result', // String，必须，目标节点 id
    },
    {
      source: 'Review result', // String，必须，起始节点 id
      target: 'Revise SOP', // String，必须，目标节点 id
    },
  ],
};






function App() {

  // useEffect(() => {
  //   const graph = new Graph({
  //     container: document.getElementById('container'),
  //     width: 800,
  //     height: 600,
  //     panning: {
  //       enabled: true,
  //     },
  //     embedding: {
  //       enabled: true,
  //       findParent({ node }) {
  //         const bbox = node.getBBox()
  //         return this.getNodes().filter((node) => {
  //           // 只有 data.parent 为 true 的节点才是父节点
  //           const data = node.getData()
  //           if (data && data.parent) {
  //             const targetBBox = node.getBBox()
  //             return bbox.isIntersectWithRect(targetBBox)
  //           }
  //           return false
  //         })
  //       }
  //     },
  //   });
  //   graph.fromJSON(data)

  // });
  

  return (
    <>
      {/* <div id="container" style={{margin:"5px", border: "thick double"}}></div> */}
      <FloatingWindow>
        <CreateSOP/>
      </FloatingWindow>
    </>

  )
}

export default App
