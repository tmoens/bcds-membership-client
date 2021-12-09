export class MembershipStatusReport {
  activeMembers: MiniMember[] = [];
  inactiveMembers: MiniMember[] = [];
  nonMembers: MiniMember[] = [];
}

export class MiniMember {
  name: string = '';
  pdgaNumber?: number;
  note?: string;
}
