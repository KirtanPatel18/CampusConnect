-- CreateTable
CREATE TABLE "ForumTopicLike" (
    "topic_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForumTopicLike_pkey" PRIMARY KEY ("topic_id","user_id")
);

-- CreateTable
CREATE TABLE "ForumReplyLike" (
    "reply_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForumReplyLike_pkey" PRIMARY KEY ("reply_id","user_id")
);

-- AddForeignKey
ALTER TABLE "ForumTopicLike" ADD CONSTRAINT "ForumTopicLike_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "ForumTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumTopicLike" ADD CONSTRAINT "ForumTopicLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumReplyLike" ADD CONSTRAINT "ForumReplyLike_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "ForumReply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumReplyLike" ADD CONSTRAINT "ForumReplyLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
