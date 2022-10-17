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
  isConnect: boolean = false;
  walletAddress: any = '';
  web3Provider:any = null;

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

  async onClickConnect() {
    let ethereum = (window as any)?.ethereum;
    if (typeof ethereum === 'undefined') {
      alert('Please install metamask before continue');
      return;
    }
    if (ethereum) {
      this.web3Provider = ethereum;
      try {
        // Request account access
        ethereum.request({ method: 'eth_requestAccounts' }).then( (address:any) => {
          console.log("Account connected: ", address[0]); // Account address that you had imported
          this.isConnect = true
          this.walletAddress = address[0];
        }).catch((err: any) => {
          console.log(err);
          this.isConnect = false;
          this.walletAddress = '';
        })
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
  }

  async onClickMint() {
    if(!this.isConnect) {
      return this.onClickConnect();
    };
    // Handle C
  }
}
