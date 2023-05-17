import { Injectable } from '@nestjs/common';
import { AI } from 'src/DBtables/ai';
import { AIDto } from '../DTO/ai.dto';
import { BaseMapper } from './base.mapper';

@Injectable()
export class AIMapper extends BaseMapper<AI,AIDto>{
  toDto(ai: AI): AIDto {
    const aiDto = new AIDto();
    aiDto.aiName = ai.aiName;
    aiDto.slug = ai.slug;
    return aiDto;
  }

  toEntity(aiDto: AIDto): AI {
    const ai = new AI();
    ai.id = aiDto.id;
    ai.aiName = aiDto.aiName;
    ai.slug = aiDto.slug;
    return ai;
  }
}
