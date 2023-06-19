import xlsx from 'node-xlsx'
import fs from 'fs'
import path from 'path'

async function case01() {
  const outputPath = path.resolve(__dirname, './_work_/caseOutput01.xlsx')
  const inputPath = path.resolve(__dirname, './_work_/caseInput01.xlsx')

  const workSheetsFromFile = xlsx.parse(inputPath)
  const [sheetOneObj, sheetTwoObj] = workSheetsFromFile

  const deviceNameCodeIdMap = new Map()
  for (const [codeId, deviceName] of sheetTwoObj.data) {
    if (codeId === '编码') continue
    deviceNameCodeIdMap.set(deviceName, codeId)
  }

  sheetOneObj.data.shift()
  const result = []
  let index = 0
  let curDeviceName = ''
  for (const [a, b, c, d] of sheetOneObj.data) {
    if (a && b && c && d) {
      index = 0
      curDeviceName = a
      result.push([])
    }
    if (c && d) {
      // rtsp://192.168.10.231:9090/dss/monitor/param?cameraid=${设备编码}%24${通道号}&substream=1
      result.push([
        d.trim(),
        c,
        `rtsp://192.168.10.231:9090/dss/monitor/param?cameraid=${deviceNameCodeIdMap.get(
          curDeviceName
        )}%24${index}&substream=1`,
      ])
    }
    index++
  }

  const title = ['uuid', 'name', 'url']

  result.shift()
  result.unshift(title)

  const buffer = xlsx.build([{ name: '汇总表', data: result, options: { '!cols': [{}, { wch: 45 }, { wch: 80 }] } }])

  fs.writeFileSync(outputPath, buffer)
}

!(async () => {
  // 合成摄像头 rtsp 地址汇总表
  await case01()
})()
