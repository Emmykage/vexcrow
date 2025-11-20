import { TransactionOutlined, WalletOutlined } from '@ant-design/icons'
import { nairaFormat } from '../../utils/nairaFormat'
import AppModal from '../../compnents/modal/Modal'
import { useEffect, useRef, useState } from 'react'
import AddFund from '../../compnents/addFund/AddFund'
import { useDispatch, useSelector } from 'react-redux'
import { createTransaction, initializeMonifyPayment } from '../../redux/actions/transaction'
import { RiUserReceived2Line } from 'react-icons/ri'
import { converter } from '../../api/currencyConverter'
import dateFormater from '../../utils/dateFormat'
import { getWallet } from '../../redux/actions/wallet'
import { SET_LOADING } from '../../redux/app'
import PropTypes from 'prop-types'
import statusStyleCard from '../../utils/statusCard'
import MoneyTransferFlow from '../../compnents/fundTransfer/FundTransfer'
import { getBankList } from '../../redux/actions/account'
import { NavLink, useNavigate } from 'react-router-dom'

const Account = () => {
  const formRef = useRef(null)
  const { user } = useSelector((state) => state.auth)

  const { wallet } = useSelector((state) => state.wallet)
  const [convertedAmount, setConvertedAmount] = useState(null)
  const address = 'Card Transfer'
  const coinType = 'bank'

  useEffect(() => {
    const fetchConversion = async () => {
      const result = await converter({ fromCurr: 'usd', toCurr: 'usd', amount: wallet?.balance })
      setConvertedAmount(result)
    }

    fetchConversion()
  }, [wallet?.balance])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isfundTransferOpen, setIsfundTransferOpen] = useState(false)
  const [isWithdrawModalOpened, setIsWithdrawalModalOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBankList())
  }, [])
  const handleSubmit = (values) => {
    dispatch(SET_LOADING(true))
    dispatch(
      initializeMonifyPayment({
        ...values,
        transaction_type: 'deposit',
        currency: 'NGN',
        email: user.email,
        customer_name: user.email,
        // customerPhone: user?.user_profile?.phone_number ?? user?.email,
        description: 'Fund Wallet',
        payment_purpose: 'Fund Wallet',
        redirect_url: `https://bitbridgeglobal.com/checkout`,
      })
    ).then((result) => {
      if (initializeMonifyPayment.fulfilled.match(result)) {
        dispatch(SET_LOADING(true))

        // setIsModalOpen(false)
        // dispatch(SET_LOADING(false))
        // dispatch(getWallet())
        // formRef.current.resetForm()
        // // window.location.reload();

        window.location.href = result.payload.responseBody.checkoutUrl
      } else [dispatch(SET_LOADING(false))]
    })
  }
  const handleWithdrawalSubmit = (values) => {
    dispatch(SET_LOADING(true))
    dispatch(
      createTransaction({
        ...values,
        transaction_type: 'withdrawal',
        status: 'pending',
      })
    ).then((result) => {
      if (createTransaction.fulfilled.match(result)) {
        setIsWithdrawalModalOpen(false)
        dispatch(SET_LOADING(false))
        dispatch(getWallet())
        formRef.current.resetForm()
      } else {
        dispatch(SET_LOADING(false))
      }
    })
  }

  return (
    <>
      <div className="md:grid lg:grid-cols-wallet gap-6 mx4">
        <div className="bg-red-60">
          <div className="flex bg-black text-gray-100 p-10 rounded justify-between">
            <div className="">
              <h4 className="text-xl font-semibold text-gray-500">Naira Wallet</h4>
              <p className="my-2 text-4xl font-medium">{nairaFormat(wallet?.balance, 'ngn')}</p>
            </div>

            {/* <div className="">
                    <h4 className="text-xl font-semibold text-gray-500">Tron Wallet Wallet</h4>
                    <p className="text-4xl font-medium">TRX {0}</p>
                    <p className="my-4 font-medium">{nairaFormat(0)}</p>
                    <h6>Rate</h6>
                    <p className="text-sm font-bold text-gray-500">
                    1560.19 NGN/USDT

                    </p>

                </div> */}
          </div>

          <div className="bg-black my-10 rounded-lg md:p-10 block md:hidden flex-col justify-between">
            <div className="min-h-[200px] bg-red- py-10 sticky top-3 flex justify-between flex-col">
              <TransactionComp
                setIsfundTransferOpen={setIsfundTransferOpen}
                setIsModalOpen={setIsModalOpen}
                setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
              />
            </div>
          </div>

          <div className="px-2 lg:p-10 bg-black my-20 rounded text-white overflow-hidden">
            <h3 className="text-xl font-semibold my-6">Transaction History (NGN)</h3>

            <div className="h-[500px] overflow-y-auto relative">
              <div className="px-4 sm:px-6 bg-rd-400 w-full lg:px-8 hover:border-gray-900">
                <div className="mt-4 flow-root">
                  <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                      <table className="min-w-full  border border-gray-700 rounded-md border-separate border-spacing-0 table-auto overflow-hidden">
                        <thead className="bg-gray-700/50">
                          <tr>
                            <th
                              scope="col"
                              className="sticky top-0 z-10 border-b border-gray-600/50  bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-300 uppercase backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                            >
                              {' '}
                              transaction
                            </th>
                            <th
                              scope="col"
                              className="sticky top-0 z-10 border-b border-gray-600/50  bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-300 uppercase backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                            >
                              {' '}
                              status
                            </th>
                            <th
                              scope="col"
                              className="sticky top-0 z-10 border-b border-gray-600/50 bg-opacity-75 px-3 py-3.5 text-center text-xs font-semibold text-gray-300 uppercase backdrop-blur backdrop-filter"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="sticky top-0 z-10  border-b border-gray-600/50 bg- bg-opacity-75 px-3 py-3.5 text-left text-xs font-semibold text-gray-300 uppercase backdrop-blur backdrop-filter lg:table-cell"
                            >
                              Time{' '}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {wallet.transactions?.map((item) => (
                            <>
                              <tr key={item?.id}>
                                <td className="whitespace-nowrap border-b border-gray-200 py-2 pl-3 pr-3 text-sm font-normal sm:pl-6 lg:pl-8">
                                  <p className=" text-gray-400 leading-5 capitalize text-sm font-semibold">
                                    {item.transaction_type}{' '}
                                  </p>
                                </td>
                                <td className="relative whitespace-nowrap border-b border-gray-200 py-3 text-center flex justify-center items-center text-gray-900 text-sm">
                                  <span
                                    className={`${statusStyleCard(item?.status)} py-1 w-full max-w-[200px] block  text-center px-3 border rounded-3xl`}
                                  >
                                    {item?.status}
                                  </span>
                                </td>

                                <td className="whitespace-nowrap border-b border-gray-200 px-3 py-3 text-sm text-gray-100 text-center font-semibold ">
                                  <p className="font-bold">
                                    {nairaFormat(item.amount, wallet.wallet_type)}
                                  </p>
                                </td>

                                <td className="relative whitespace-nowrap border-b text-left border-gray-200 py-3 pr-4 pl-3 text-gray-300  text-sm sm:pr-8 lg:pr-8">
                                  {dateFormater(item?.created_at)}
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black rounded-lg md:p-10 md:flex hidden flex-col justify-between">
          <div className="min-h-[500px] bg-red- py-10 sticky top-3 flex justify-between flex-col">
            <TransactionComp
              setIsfundTransferOpen={setIsfundTransferOpen}
              setIsModalOpen={setIsModalOpen}
              setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
            />
          </div>
        </div>
      </div>

      <AppModal
        title={'Fund Wallet'}
        isModalOpen={isModalOpen}
        handleOk={() => {}}
        handleCancel={() => {
          setIsModalOpen(false)
        }}
      >
        <div className="bg-purple- p-0">
          <AddFund
            handleSubmit={handleSubmit}
            coin_type={coinType}
            address={address}
            ref={formRef}
          />
        </div>
      </AppModal>

      <AppModal
        title={'Withdraw Funds'}
        isModalOpen={isWithdrawModalOpened}
        handleOk={() => {}}
        handleCancel={() => {
          setIsWithdrawalModalOpen(false)
        }}
      >
        <div className="bg-purple- p-0">
          <AddFund
            handleSubmit={handleWithdrawalSubmit}
            coin_type={coinType}
            disableAddress={false}
            transaction_type="withdrawal"
            ref={formRef}
            address={address}
          />
        </div>
      </AppModal>

      <AppModal
        handleCancel={() => setIsfundTransferOpen(false)}
        title={'Send Money'}
        isModalOpen={isfundTransferOpen}
      >
        <MoneyTransferFlow setIsfundTransferOpen={setIsfundTransferOpen} />
      </AppModal>
    </>
  )
}

const TransactionComp = ({ setIsModalOpen, setIsWithdrawalModalOpen, setIsfundTransferOpen }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('add')

  return (
    <>
      <div className="text-gray-900 gap-4 flex justify-between ">
        {/* <div className="flex gap-3 mb-6"> */}
        <button
          // onClick={() => setActiveTab('add')}
          onClick={() => setIsModalOpen(true)}
          className={`px-4 py-2 rounded-lg font-medium transition
            ${activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Add Funds
        </button>

        <button
          onClick={() => {
            setActiveTab('wallet')
            navigate('/dashboard/virtual-account')
          }}
          className={`px-4 py-2 rounded-lg font-medium transition
            ${activeTab === 'wallet' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Virtual Card
        </button>

        <button
          onClick={() => {
            setActiveTab('transfer')
            setIsfundTransferOpen((prev) => !prev)
          }}
          className={`px-4 py-2 rounded-lg font-medium transition
            ${activeTab === 'transfer' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Transfer Funds
        </button>
      </div>

      {/* CONTENT COMPONENTS */}
      {/* <div className="p-6 rounded-xl border bg-white shadow">
          {activeTab === 'add' && <AddFunds />}
          {activeTab === 'wallet' && <Wallet />}
          {activeTab === 'transfer' && <TransferFunds />}
        </div> */}
      {/* </div> */}

      {/* <button
          onClick={() => setIsModalOpen(true)}
          className="flex text-purple-300 hover:text-alt cursor-pointer flex-col items-center justify-center"
        >
          <WalletOutlined />
          <span className="text-center">Add Funds</span>
        </button>
        <button className="flex text-purple-300 hover:text-alt cursor-pointer flex-col items-center justify-center">
          <RiUserReceived2Line />
          <NavLink className="text-center">Virtual Card</NavLink>
        </button>
        <button
          onClick={() => setIsfundTransferOpen((prev) => !prev)}
          className="flex text-purple-300 hover:text-alt cursor-pointer flex-col items-center justify-center"
        >
          <TransactionOutlined />
          <span className="text-center">Transfer Funds</span>
        </button> */}
      {/* </div> */}
    </>
  )
}

// function AddFunds() {
//   return <div className="text-gray-700">🔹 Add Funds Component</div>
// }

// function Wallet() {
//   return <div className="text-gray-700">💼 Wallet Component</div>
// }

// function TransferFunds() {
//   return <div className="text-gray-700">🔁 Transfer Funds Component</div>
// }
TransactionComp.propTypes = {
  setIsModalOpen: PropTypes.func,
  setIsWithdrawalModalOpen: PropTypes.func,
  setIsfundTransferOpen: PropTypes.func,
}
export default Account
