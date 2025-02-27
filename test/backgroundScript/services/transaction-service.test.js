/* eslint-disable no-unused-vars */
import * as TransactionService from '../../../backgroundScript/services/transaction-service';
import { mockTransactionArr } from '../../lib/constants/transaction-state';
import * as TransactionResult from './__result__/transaction-result';

jest.mock('../../../backgroundScript/apis/fees');
jest.mock('../../../backgroundScript/apis/dot-wallet');

const address = '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH';
const toAddress = '5DqgChvsFs2E3Wz1LwYi9zhQNuGVP3YGUerMdZvTgM1scDsH';

test('Filter Transactions', async () => {
  const { transactionArr } = mockTransactionArr;
  const network = { value: 'polkadot' };
  const transaction = await TransactionService.filterTransactions(transactionArr, network, address);
  expect(transaction[0].internal.address).toMatch(address);
  expect(transaction[0].internal.network).toMatchObject(network);
});

test('Get Transaction Fees', async () => {
  const fees = await TransactionService.getTransactionFees('TRANSFER_COINS', address, toAddress);
  expect(fees).toMatchObject(TransactionResult.FEES);
});

test('Confirm Transaction', async () => {
  const network = { value: 'polkadot' };
  const transaction = {
    account: { address },
    to: toAddress,
    amount: '1',
    unit: { power: -3, value: 'm', text: 'milli' },
    txnType: 'TRANSFER_COINS',
  };
  const confirmedTransactionResult = await TransactionService.confirmTransaction(
    address,
    network,
    transaction,
  );
  expect(confirmedTransactionResult).toMatchObject(TransactionResult.CONFIRM_TRANSACTION);
});

test('Confirm Transaction Throw error for invalid to address', async () => {
  //dummy network
  const network = { value: 'polkadot' };
  const transaction = {
    account: { address },
    to: 'dummyaddress',
    amount: '1',
    unit: { power: -3, value: 'm', text: 'milli' },
    txnType: 'TRANSFER_COINS',
  };
  const confirmedTransactionResult = await TransactionService.confirmTransaction(
    address,
    network,
    transaction,
  );
  expect(confirmedTransactionResult).toMatchObject(
    TransactionResult.CONFIRM_TRANSACTION_ADDRESS_ERROR,
  );
});

test('Confirm Transaction Throw error for invalid amount', async () => {
  // dummy network
  const network = { value: 'polkadot' };
  const transaction = {
    account: { address },
    to: toAddress,
    amount: '100000000000000000',
    unit: { power: -3, value: 'm', text: 'milli' },
    txnType: 'TRANSFER_COINS',
  };
  const confirmedTransactionResult = await TransactionService.confirmTransaction(
    address,
    network,
    transaction,
  );
  expect(confirmedTransactionResult).toMatchObject(
    TransactionResult.CONFIRM_TRANSACTION_AMOUNT_ERROR,
  );
});
