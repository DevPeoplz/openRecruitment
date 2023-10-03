import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const AttachmentObject = definePrismaObject('Attachment', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(AttachmentIdFieldObject),
    contentType: t.field(AttachmentContentTypeFieldObject),
    filename: t.field(AttachmentFilenameFieldObject),
    path: t.field(AttachmentPathFieldObject),
    userProfilePhoto: t.relation('userProfilePhoto', AttachmentUserProfilePhotoFieldObject),
    candidateCv: t.relation('candidateCv', AttachmentCandidateCvFieldObject),
    candidateAvatar: t.relation('candidateAvatar', AttachmentCandidateAvatarFieldObject),
    candidateCoverLetter: t.relation('candidateCoverLetter', AttachmentCandidateCoverLetterFieldObject),
    uploader: t.relation('uploader', AttachmentUploaderFieldObject),
    uploaderId: t.field(AttachmentUploaderIdFieldObject),
    createdAt: t.field(AttachmentCreatedAtFieldObject),
    updatedAt: t.field(AttachmentUpdatedAtFieldObject),
    offerFiles: t.relation('offerFiles', AttachmentOfferFilesFieldObject(t)),
    talentPoolFiles: t.relation('talentPoolFiles', AttachmentTalentPoolFilesFieldObject(t)),
  }),
});

export const AttachmentIdFieldObject = defineFieldObject('Attachment', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const AttachmentContentTypeFieldObject = defineFieldObject('Attachment', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.contentType,
});

export const AttachmentFilenameFieldObject = defineFieldObject('Attachment', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.filename,
});

export const AttachmentPathFieldObject = defineFieldObject('Attachment', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.path,
});

export const AttachmentUserProfilePhotoFieldObject = defineRelationObject('Attachment', 'userProfilePhoto', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const AttachmentCandidateCvFieldObject = defineRelationObject('Attachment', 'candidateCv', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const AttachmentCandidateAvatarFieldObject = defineRelationObject('Attachment', 'candidateAvatar', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const AttachmentCandidateCoverLetterFieldObject = defineRelationObject('Attachment', 'candidateCoverLetter', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const AttachmentUploaderFieldObject = defineRelationObject('Attachment', 'uploader', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const AttachmentUploaderIdFieldObject = defineFieldObject('Attachment', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.uploaderId,
});

export const AttachmentCreatedAtFieldObject = defineFieldObject('Attachment', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const AttachmentUpdatedAtFieldObject = defineFieldObject('Attachment', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});

export const AttachmentOfferFilesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferFileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferFileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferFileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferFileScalarFieldEnum], required: false }),
}))

export const AttachmentOfferFilesFieldObject = defineRelationFunction('Attachment', (t) =>
  defineRelationObject('Attachment', 'offerFiles', {
    description: undefined,
    nullable: false,
    args: AttachmentOfferFilesFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const AttachmentTalentPoolFilesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TalentPoolFileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TalentPoolFileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TalentPoolFileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TalentPoolFileScalarFieldEnum], required: false }),
}))

export const AttachmentTalentPoolFilesFieldObject = defineRelationFunction('Attachment', (t) =>
  defineRelationObject('Attachment', 'talentPoolFiles', {
    description: undefined,
    nullable: false,
    args: AttachmentTalentPoolFilesFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);
