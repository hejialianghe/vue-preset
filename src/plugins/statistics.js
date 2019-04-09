import MTAH5 from 'mta-h5-analysis'
export default function tongji (eventID, data) {
  try {
    console.log('事件数据：', eventID, data)
    MTAH5.clickStat(eventID, data)
  } catch (error) {
    console.log('统计错误: ', error)
  }
}
