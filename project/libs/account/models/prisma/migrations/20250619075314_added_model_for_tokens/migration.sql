-- CreateTable
CREATE TABLE "tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tokenId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_tokenId_key" ON "tokens"("tokenId");
