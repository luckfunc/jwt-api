import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  create(createAnnouncementDto: CreateAnnouncementDto) {
    return 'This action adds a new announcement';
  }

  findAll() {
    return [
      {
        content: "尊敬的同学们： 为了更好地管理和利用学校图书馆的资源，提高学习效率和阅读水平，学校图书馆制定了以下规定，希望大家遵守： 图书借阅：同学们可携带有效学生证在图书馆借阅图书，每人最多借阅5本，借阅期限为15天，逾期未还者将被扣除借阅资格。 图书归还：借阅图书应按时归还，逾期未还者将被扣除借阅资格，并按规定缴纳逾期罚款。 阅览室使用：同学们可在阅览室内阅读图书，但应保持安静，不得吸烟、喧哗等行为，保持阅览室环境整洁。 图书损毁：同学们应当爱护图书，若图书损坏或遗失，应当及时赔偿或购置同等书籍，否则将扣除借阅资格。 希望同学们自觉遵守以上规定，共同维护学校图书馆的良好秩序和环境，为提高学习效果和阅读水平贡献力量。"
      },
      {
        content: "关于调整学生借阅权限的通知 各位同学： 根据学校最新防疫措施，为便于同学们利用馆藏图书资源，我馆决定对在校生读者借阅权限作如下调整：1. 从即日起，已外借未归还的图书和将借出的图书，图书应还日期推迟至2023年2月24日，期间均不计超期。2.  从即日起，学生读者借阅图书上限由8册增加至15册。 望周知"
      },
      {
        content: `各位毕业生：
        我校2022届毕业生离校手续办理即将开始，为确保毕业生顺利办理图书馆相关手续，特安排如下：
       一、请各位毕业生利用图书馆网站，图书馆微信公众号，自助借还机，认真查看自己所借的图书是否已经全部还清。如有未还图书，请来馆还清所借图书。若有遗失书刊，也请提前办理相关手续。
       二、图书馆于7月4日对所有毕业生进行图书停借处理。
       三、7月5日—7月9日，图书馆集中审核，审核完成后统一提交离校系统平台办理。
       四、7月5日—7月9日，在江南图书馆一楼还书处集中办理电子阅览室上机费余额退费。
   请各位毕业生相互告知！
   图 书 馆  
                      2022年7月4日
   `
      },
      {
        content: `为了从狭窄人生的缝隙中仰望高远天空，

        为了给身处的纷繁世界寻找一个注脚，我们翻开了书；
        
        为邂逅干涸生命被点燃的美好瞬间，
        
        为抓住不确定时代中的一丝笃定，我们翻开了书；
        
        为追问时间流逝的意义，
        
        为寻觅无常生命的永恒真义，我们翻开了书——
        
        因为，书知道答案。
        
        哪一本是你生命中的答案之书？
        
        知识视界读书月“书知道答案”线上活动经典好书PK赛已落下帷幕`
      
      }
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} announcement`;
  }

  update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    return `This action updates a #${id} announcement`;
  }

  remove(id: number) {
    return `This action removes a #${id} announcement`;
  }
}
