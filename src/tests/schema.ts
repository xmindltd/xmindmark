import joi from 'joi'

const BaseSchema = joi.object({
  id: joi.string().required(),
  title: joi.string().required(),
  class: joi.string(),
})

const BoundarySchema = joi.object({})
const SummarySchema = joi.object({})

const TopicSchema = BaseSchema.append({
  structureClass: joi.string(),
  titleUnedited: joi.boolean().truthy().required(),
  boundaries: joi.array().items(BoundarySchema).required(),
  summaries: joi.array().items(SummarySchema).required(),
  children: joi.object({
    attached: joi.array().items(joi.link('#TopicSchema'))
  })
}).id('TopicSchema')

const SheetSchema = BaseSchema.append({
  rootTopic: TopicSchema,
  topicPositioning: joi.string().allow('fixed')
})

export const ContentJSONSchema = joi.array().items(SheetSchema).length(1)

export const assertSchema = joi.assert
