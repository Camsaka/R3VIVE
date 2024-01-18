-- CreateTable
CREATE TABLE "CertifRequest" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "serialn" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "historic" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mintable" BOOLEAN NOT NULL DEFAULT false,
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    "dateofcreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CertifRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertifIPFSData" (
    "id" TEXT NOT NULL,
    "uri" TEXT NOT NULL,

    CONSTRAINT "CertifIPFSData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CertifIPFSData_uri_key" ON "CertifIPFSData"("uri");
