import * as TransactionWatcherService from '../../../backgroundScript/services/transaction-watcher-service';
import * as TransactionResult from './__result__/transaction-result';
import * as API from '../../../backgroundScript/apis/api';
import { ALEXANDER_NETWORK } from '../../../lib/constants/networks';

jest.mock('../../../backgroundScript/store/store-provider');
jest.mock('../../../backgroundScript/apis/tx');

test('Submit Transaction', async () => {
  API.defineApi(ALEXANDER_NETWORK.networkFullUrl);
  const transaction = await TransactionWatcherService.submitTransaction(
    TransactionResult.CONFIRM_TRANSACTION,
  );
  expect(transaction).toMatchObject(TransactionResult.SUBMIT_TRANSACTION);
});
