import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../config/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [RequestService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalSupply: string | number | any = 0;
  voteResult: any;
  walletAddress: any;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.fetchTotalSupply();
  }

  onClickVote(proposal: number) {
    this.requestService.vote({
      proposalId: proposal,
      amount: 1
    }).subscribe(data => {
      console.log(data);
    })
  }

  fetchTotalSupply() {
    this.requestService.getTotalSupply().subscribe(data => {
      this.totalSupply = data;
    })
  }

  onClickShowResult() {
    this.requestService.getVoteResult().subscribe(data => {
      this.voteResult = data;
    })
    this.voteResult = 'hereh'
  }

  onClickDelegate(address: any) {
    if(!address) return;
    this.requestService.delegate({
      delegateeAddress: address,
    }).subscribe(data => {
      console.log(data);
    })
  }
}
