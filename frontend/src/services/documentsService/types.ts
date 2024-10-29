import { UserInterface } from "~/services";

export interface UploadedDocumentInterface {
  id: string;
  ownerId: string;
}

export interface DocumentInterface {
  id: string;
  owner: UserInterface;
}

export interface DocumentLine {
  "Claim ID": string;
  "Subscriber ID": string;
  "Member Sequence": number;
  "Claim Status": string;
  Billed: number;
  Allowed: number;
  Paid: number;
  "Payment Status Date": Date;
  "Service Date": Date;
  "Received Date": Date;
  "Entry Date": Date;
  "Processed Date": Date;
  "Paid Date": Date;
  "Payment Status": string;
  "Group Name": string;
  "Group ID": string;
  "Division Name": string;
  "Division ID": string;
  Plan: string;
  "Plan ID": string;
  "Place of Service": string;
  "Claim Type": string;
  "Procedure Code": string;
  "Member Gender": string;
  "Provider ID": string;
  "Provider Name": string;
}
