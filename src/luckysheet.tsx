
import React, { useEffect } from 'react';
import luckysheet from '@/luckysheet/src';

const luckyCss = {
  margin: '0px',
  padding: '0px',
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: '0px',
  top: '0px'
} as const

const Luckysheet: React.FC = () => {

  useEffect(() => {
    luckysheet.create({
      container: "luckysheet",
      // plugins:['chart'],
      hook: {
        cellEditBefore(e: any) {
          debugger
          console.log('e', e);
        },
        cellUpdateBefore(e: any) {
          debugger
          console.log('e', e);
        }
      }
    });
  }, [])

  return <div id="luckysheet" style={luckyCss} />
}

export default Luckysheet