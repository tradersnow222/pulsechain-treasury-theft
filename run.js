
import { _TypedDataEncoder } from '@ethersproject/hash';

import ethers from 'ethers';
// const ethers = require('ethers');


const EIP712_TYPES = {
    Transaction: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'operation', type: 'uint8' },
      { name: 'nonce', type: 'uint256' }
    ]
  };



function calcTransactionHash(
    network, //: string,
    moduleAddress, //: string,
    transaction //: SafeTransaction
  ) {
    const chainId = parseInt(network);
    const domain = {
      chainId,
      verifyingContract: moduleAddress
    };
    return _TypedDataEncoder.hash(domain, EIP712_TYPES, transaction);
  }

  const REALITY_MODULE_ABI = [
    // Events
    'event ProposalQuestionCreated(bytes32 indexed questionId, string indexed proposalId)',
  
    // Read functions
    'function avatar() view returns (address)', // Reality Module
    'function executor() view returns (address)', // Dao Module
    'function oracle() view returns (address)',
    'function questionCooldown() view returns (uint32)',
    'function answerExpiration() view returns (uint32)',
    'function buildQuestion(string proposalId, bytes32[] txHashes) view returns (string)',
    'function executedProposalTransactions(bytes32 questionHash, bytes32 txHash) view returns (bool)',
    'function questionIds(bytes32 questionHash) view returns (bytes32)',
    'function minimumBond() view returns (uint256)',
  
    // Write functions
    'function addProposal(string proposalId, bytes32[] txHashes)',
    'function executeProposalWithIndex(string proposalId, bytes32[] txHashes, address to, uint256 value, bytes data, uint8 operation, uint256 txIndex)'
  ];


  const REALITY_3_0_MODULE_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"bytes32","name":"answer_hash","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"answer","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"nonce","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bond","type":"uint256"}],"name":"LogAnswerReveal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"LogCancelArbitration","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"answer","type":"bytes32"}],"name":"LogFinalize","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"bounty_added","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bounty","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"LogFundAnswerBounty","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"min_bond","type":"uint256"}],"name":"LogMinimumBond","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"answer","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"history_hash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bond","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ts","type":"uint256"},{"indexed":false,"internalType":"bool","name":"is_commitment","type":"bool"}],"name":"LogNewAnswer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"template_id","type":"uint256"},{"indexed":false,"internalType":"string","name":"question","type":"string"},{"indexed":true,"internalType":"bytes32","name":"content_hash","type":"bytes32"},{"indexed":false,"internalType":"address","name":"arbitrator","type":"address"},{"indexed":false,"internalType":"uint32","name":"timeout","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"opening_ts","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"nonce","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"created","type":"uint256"}],"name":"LogNewQuestion","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"template_id","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"question_text","type":"string"}],"name":"LogNewTemplate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"},{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"LogNotifyOfArbitrationRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"question_id","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"reopened_question_id","type":"bytes32"}],"name":"LogReopenQuestion","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"arbitrator","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogSetQuestionFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogWithdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"arbitrator_question_fees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"template_id","type":"uint256"},{"internalType":"string","name":"question","type":"string"},{"internalType":"address","name":"arbitrator","type":"address"},{"internalType":"uint32","name":"timeout","type":"uint32"},{"internalType":"uint32","name":"opening_ts","type":"uint32"},{"internalType":"uint256","name":"nonce","type":"uint256"}],"name":"askQuestion","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"template_id","type":"uint256"},{"internalType":"string","name":"question","type":"string"},{"internalType":"address","name":"arbitrator","type":"address"},{"internalType":"uint32","name":"timeout","type":"uint32"},{"internalType":"uint32","name":"opening_ts","type":"uint32"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"min_bond","type":"uint256"}],"name":"askQuestionWithMinBond","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"},{"internalType":"bytes32","name":"answer","type":"bytes32"},{"internalType":"address","name":"payee_if_wrong","type":"address"},{"internalType":"bytes32","name":"last_history_hash","type":"bytes32"},{"internalType":"bytes32","name":"last_answer_or_commitment_id","type":"bytes32"},{"internalType":"address","name":"last_answerer","type":"address"}],"name":"assignWinnerAndSubmitAnswerByArbitrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"cancelArbitration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"question_ids","type":"bytes32[]"},{"internalType":"uint256[]","name":"lengths","type":"uint256[]"},{"internalType":"bytes32[]","name":"hist_hashes","type":"bytes32[]"},{"internalType":"address[]","name":"addrs","type":"address[]"},{"internalType":"uint256[]","name":"bonds","type":"uint256[]"},{"internalType":"bytes32[]","name":"answers","type":"bytes32[]"}],"name":"claimMultipleAndWithdrawBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"},{"internalType":"bytes32[]","name":"history_hashes","type":"bytes32[]"},{"internalType":"address[]","name":"addrs","type":"address[]"},{"internalType":"uint256[]","name":"bonds","type":"uint256[]"},{"internalType":"bytes32[]","name":"answers","type":"bytes32[]"}],"name":"claimWinnings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"commitments","outputs":[{"internalType":"uint32","name":"reveal_ts","type":"uint32"},{"internalType":"bool","name":"is_revealed","type":"bool"},{"internalType":"bytes32","name":"revealed_answer","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"content","type":"string"}],"name":"createTemplate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"content","type":"string"},{"internalType":"string","name":"question","type":"string"},{"internalType":"address","name":"arbitrator","type":"address"},{"internalType":"uint32","name":"timeout","type":"uint32"},{"internalType":"uint32","name":"opening_ts","type":"uint32"},{"internalType":"uint256","name":"nonce","type":"uint256"}],"name":"createTemplateAndAskQuestion","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"fundAnswerBounty","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getArbitrator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getBestAnswer","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getBond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getBounty","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getContentHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getFinalAnswer","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"},{"internalType":"bytes32","name":"content_hash","type":"bytes32"},{"internalType":"address","name":"arbitrator","type":"address"},{"internalType":"uint32","name":"min_timeout","type":"uint32"},{"internalType":"uint256","name":"min_bond","type":"uint256"}],"name":"getFinalAnswerIfMatches","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getFinalizeTS","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getHistoryHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getMinBond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getOpeningTS","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"getTimeout","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"isFinalized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"isPendingArbitration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"isSettledTooSoon","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"},{"internalType":"address","name":"requester","type":"address"},{"internalType":"uint256","name":"max_previous","type":"uint256"}],"name":"notifyOfArbitrationRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"question_claims","outputs":[{"internalType":"address","name":"payee","type":"address"},{"internalType":"uint256","name":"last_bond","type":"uint256"},{"internalType":"uint256","name":"queued_funds","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"questions","outputs":[{"internalType":"bytes32","name":"content_hash","type":"bytes32"},{"internalType":"address","name":"arbitrator","type":"address"},{"internalType":"uint32","name":"opening_ts","type":"uint32"},{"internalType":"uint32","name":"timeout","type":"uint32"},{"internalType":"uint32","name":"finalize_ts","type":"uint32"},{"internalType":"bool","name":"is_pending_arbitration","type":"bool"},{"internalType":"uint256","name":"bounty","type":"uint256"},{"internalType":"bytes32","name":"best_answer","type":"bytes32"},{"internalType":"bytes32","name":"history_hash","type":"bytes32"},{"internalType":"uint256","name":"bond","type":"uint256"},{"internalType":"uint256","name":"min_bond","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"template_id","type":"uint256"},{"internalType":"string","name":"question","type":"string"},{"internalType":"address","name":"arbitrator","type":"address"},{"internalType":"uint32","name":"timeout","type":"uint32"},{"internalType":"uint32","name":"opening_ts","type":"uint32"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"min_bond","type":"uint256"},{"internalType":"bytes32","name":"reopens_question_id","type":"bytes32"}],"name":"reopenQuestion","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"reopened_questions","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"reopener_questions","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"resultFor","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"}],"name":"resultForOnceSettled","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"setQuestionFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"},{"internalType":"bytes32","name":"answer","type":"bytes32"},{"internalType":"uint256","name":"max_previous","type":"uint256"}],"name":"submitAnswer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"},{"internalType":"bytes32","name":"answer","type":"bytes32"},{"internalType":"address","name":"answerer","type":"address"}],"name":"submitAnswerByArbitrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"},{"internalType":"bytes32","name":"answer_hash","type":"bytes32"},{"internalType":"uint256","name":"max_previous","type":"uint256"},{"internalType":"address","name":"_answerer","type":"address"}],"name":"submitAnswerCommitment","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"},{"internalType":"bytes32","name":"answer","type":"bytes32"},{"internalType":"uint256","name":"max_previous","type":"uint256"},{"internalType":"address","name":"answerer","type":"address"}],"name":"submitAnswerFor","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"question_id","type":"bytes32"},{"internalType":"bytes32","name":"answer","type":"bytes32"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"bond","type":"uint256"}],"name":"submitAnswerReveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"template_hashes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"templates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];


  function buildProposalQuestion(proposalId, txHashes)
  {
    const iface = new ethers.utils.Interface(REALITY_MODULE_ABI);
    const question = iface.encodeFunctionData('addProposal', [proposalId, txHashes]);

    return question;
  }

  function buildExecuteProposalWithIndex(proposalId, txHashes, to, value, data, operation, txIndex)
  {
    const iface = new ethers.utils.Interface(REALITY_MODULE_ABI);
    const txn = iface.encodeFunctionData('executeProposalWithIndex', [proposalId, txHashes, to, value, data, operation, txIndex]);

    return txn;
  }

  // submitAnswer(bytes32 question_id, bytes32 answer, uint256 max_previous)
  function buildTransactionForAnswer(questionId, answer, maxPrevious)
  {
    const iface = new ethers.utils.Interface(REALITY_3_0_MODULE_ABI);
    const txn = iface.encodeFunctionData('submitAnswer', [questionId, answer, maxPrevious]);

    return txn;
  }

  function main()
  {
    const network = '369'; // pulsechain
    const moduleAddress = '0xa62D2a75eb39C12e908e9F6BF50f189641692F2E'; // reality.eth
    const proposalId = '0x4195b95089726f57caab2727aa16075794d9f817007ffac6ba40cabadaadc956'; // hopefully an unique id, can be the same as the questionId

    const transaction = {
        to: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        data: '0xa9059cbb000000000000000000000000410e08B3e64aAc18AE18F2c5066D26e848AC8B9C00000000000000000000000000000000000000000000000000000E8905C36580',
        value: '0x0',
        operation: 0,
        nonce: 0,
    } // USDC transfer

    /** STEP 1 */
    const hash = calcTransactionHash(network, moduleAddress, transaction);
    console.log('hash', hash)

    const question = buildProposalQuestion(proposalId, [hash]);

    console.log('question', question)

    /** STEP 2 */

    const questionData = "0xb24bd5a88792136ede350b57a18e033955e6e4e0bf08e60f49c3da0a82bb388b"; // WARNING: this must be found from the blockchain logs
    const realityETH_3_0 = '0x5b7dD1E86623548AF054A4985F7fc8Ccbb554E2c';
    const answer = buildTransactionForAnswer(questionData, 
    '0x0000000000000000000000000000000000000000000000000000000000000001', // ANSWER, 1 = yes
    '0x000000000000000000000000000000000000000000000000016345785d8a0000'); // previous bond

    console.log('answer for reality.eth', JSON.stringify({to: realityETH_3_0, data:answer})) // don't forget to send the value of 0.1 ETH, otherwise txn will fail. 

    /** STEP 3 */
    // once 6 days have passed, execute the proposal
    const txn = buildExecuteProposalWithIndex(proposalId, [hash], transaction.to, transaction.value, transaction.data, transaction.operation, transaction.nonce);

    console.log('txn for executing', txn)

  }

  main();


// method to fetch code to verify the contract exists. 
// async function main2()
// {

//     const provider =    new ethers.providers.JsonRpcProvider('https://rpc.pulsechain.com'); 

//     const addr = '0xa62D2a75eb39C12e908e9F6BF50f189641692F2E';

//     //provider get code at addr
//     let code = await provider.getCode(addr);
//     console.log('code', code);

// }
// 
// main2();
