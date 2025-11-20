import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import states from '../../data/states.json'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCard,
  fundcard,
  get_card_balance,
  getRates,
  getUserCard,
  getUserCards,
  registerCardHolder,
} from '../../redux/actions/account'
import dateFormater from '../../utils/dateFormat'
import { toast } from 'react-toastify'
import { nairaFormat } from '../../utils/nairaFormat'
import { SET_LOADING } from '../../redux/app'
import PropTypes from 'prop-types'

export default function VirtualCardApplication() {
  const { user, loading } = useSelector((state) => state.auth)
  const {
    wallet: { card_holder, balance },
  } = useSelector((state) => state.wallet)
  const { cardHolder, cards, loading: isLoading } = useSelector((state) => state.account)
  const [card, setCard] = useState()

  const [cardType, setCardType] = useState('virtual') // 'virtual' or 'physical'
  const [formData, setFormData] = useState({
    first_name: user?.user_profile?.first_name ?? '',
    last_name: user?.user_profile?.last_name ?? '',
    phone: user?.user_profile?.phone_number ?? '',
    email_address: user?.email ?? '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    house_no: '',
    id_type: 'NIGERIAN_BVN_VERIFICATION',
    bvn: '',
    selfie_image: '',
    meta_data: {
      any_key: '',
    },
    email: '',
    limit: 5000,
    deliveryAddress: '',
    design: 'midnight',
    agreeTos: false,
    card_brand: 'Mastercard',
    amount: '',
    card_currency: 'USD',
    card_type: 'Virtual',
    card_limit: 5000,
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [successCreate, setSuccessCreate] = useState(null)
  const designs = [
    { id: 'midnight', label: 'Midnight' },
    { id: 'aurora', label: 'Aurora' },
    { id: 'graphite', label: 'Graphite' },
  ]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserCards())
  }, [])

  useEffect(() => {
    setFormData({
      ...formData,
      first_name: user.user_profile.first_name,
      last_name: user.user_profile.last_name,
      phone: user.user_profile.phone_number,
      email_address: user.email,
      country: 'Nigeria',
    })
  }, [user])

  useEffect(() => {
    setFormData({
      ...formData,
      city: card?.city,
      state: card?.state,
      bvn: card?.bvn,
      address: card?.address,
      house_no: card?.house_no,
      postal_code: card?.postal_code,
    })
  }, [card])

  console.log(card_holder, cards)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }))
  }

  function validate() {
    // if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return 'Please enter a valid email.'
    // if (cardType === 'physical' && !formData.deliveryAddress.trim())
    //   return 'Please provide a delivery address for a physical card.'
    if (!formData.agreeTos) return 'You must agree to the terms.'
    return null
  }

  async function handleSubmitCard(e) {
    e.preventDefault()

    console.log('first')

    setSubmitting(true)
    setSuccessCreate(null)

    // Simulate async request
    // await new Promise((r) => setTimeout(r, 900))
    dispatch(
      createCard({
        card: formData,
      })
    )
      .unwrap()
      .then((res) => {
        setSuccessCreate({ ok: true, message: `Application submitted for a ${cardType} card.` })
      })
      .catch((err) => {
        console.log(err)
        setSuccessCreate({
          ok: false,
          message: `Application failed  ${cardType} card.${err.message}`,
        })
      })
      .finally(() => {
        setSubmitting(false)
      })

    // setSubmitting(false)
    // setSuccess({ ok: true, message: `Application submitted for a ${cardType} card.` })
  }
  async function handleSubmit(e) {
    e.preventDefault()
    const err = validate()
    if (err) return setSuccess({ ok: false, message: err })

    setSubmitting(true)
    setSuccess(null)

    // Simulate async request
    // await new Promise((r) => setTimeout(r, 900))
    dispatch(
      registerCardHolder({
        card_holder: formData,
      })
    )
      .unwrap()
      .then((res) => {
        setStep('create')

        setSuccess({ ok: true, message: `Application submitted for a ${cardType} card.` })
      })
      .catch((err) => {
        console.log(err)
        setSuccess({ ok: false, message: `Application failed  ${cardType} card.${err.message}` })
      })
      .finally(() => {
        setSubmitting(false)
      })

    // setSubmitting(false)
    // setSuccess({ ok: true, message: `Application submitted for a ${cardType} card.` })
  }

  const [step, setStep] = useState('apply')

  useEffect(() => {
    setStep('create')

    if (card_holder) {
      setStep('create')
    } else {
      setStep('apply')
    }
  }, [card_holder])
  const applyForcardcontent = (
    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left - Form */}
      <div className="bg-gray-850/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-800">
        <h2 className="text-2xl font-semibold mb-2">Apply for a Card</h2>
        <p className="text-sm text-gray-400 mb-6">
          Choose virtual or physical. Fill the form to apply.
        </p>

        <div className="flex gap-3 mb-6">
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              cardType === 'virtual'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-gray-800 text-gray-300'
            }`}
            onClick={() => setCardType('virtual')}
            aria-pressed={cardType === 'virtual'}
          >
            Virtual Card
          </button>

          <button
            disabled={true}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              cardType === 'physical'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-gray-800 text-gray-300'
            }`}
            onClick={() => setCardType('physical')}
            aria-pressed={cardType === 'physical'}
          >
            Physical Card
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="p-2 rounded bg-gray-700 w-full"
              disabled={user?.user_profile}
            />
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-2 rounded bg-gray-700 w-full"
              disabled={user?.user_profile}
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 rounded bg-gray-700 w-full"
              disabled={user?.user_profile}
            />
            <input
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
              placeholder="Email Address"
              className="p-2 rounded bg-gray-700 w-full"
              disabled={user?.user_profile}
            />
          </div>
          <h3 className="text-lg font-semibold mt-4">Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street Address"
              className="p-2 rounded bg-gray-700 w-full"
              required
            />
            <input
              name="house_no"
              value={formData.house_no}
              onChange={handleChange}
              placeholder="House No"
              className="p-2 rounded bg-gray-700 w-full"
              required
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="p-2 rounded bg-gray-700 w-full"
              required
            />
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="p-2 rounded bg-gray-700 w-full"
              required
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="p-2 rounded bg-gray-700 w-full"
              disabled
            />
            <input
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              placeholder="Postal Code"
              className="p-2 rounded bg-gray-700 w-full"
            />
          </div>
          <h3 className="text-lg font-semibold mt-4">Identity</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="id_type"
              value={formData.id_type}
              onChange={handleChange}
              placeholder="ID Type"
              className="p-2 rounded bg-gray-700 w-full"
              disabled={user?.user_profile}
            />
            <input
              name="bvn"
              value={formData.bvn}
              onChange={handleChange}
              placeholder="BVN"
              className="p-2 rounded bg-gray-700 w-full"
            />
            {/* <input
                name="identity.selfie_image"
                value={formData.identity.selfie_image}
                onChange={handleChange}
                placeholder="Selfie Image URL"
                className="col-span-2 p-2 rounded bg-gray-700 w-full"
              /> */}
          </div>
          {/* <h3 className="text-lg font-semibold mt-4">Meta Data</h3>
          <input
            name="meta_data.any_key"
            value={formData.meta_data.any_key}
            onChange={handleChange}
            placeholder="Any Key"
            className="p-2 rounded bg-gray-700 w-full"
          /> */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Daily spend limit (USD)</label>
            <input
              name="limit"
              value={formData?.limit}
              onChange={handleChange}
              type="number"
              min={1000}
              disabled
              className="w-full bg-gray-900 border border-gray-800 rounded-md p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {cardType === 'physical' && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Delivery address</label>
              <textarea
                name="deliveryAddress"
                value={formData?.address}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-md p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Street, City, State, Country"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Card design</label>
            <div className="flex gap-2">
              {designs.map((d) => (
                <label
                  key={d.id}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border ${formData?.design === d.id ? 'border-indigo-500' : 'border-gray-800'}`}
                >
                  <input
                    type="radio"
                    name="design"
                    value={d.id}
                    checked={formData.design === d.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="w-12 h-8 rounded-md flex items-center justify-center text-xs font-semibold bg-gradient-to-br from-gray-800 to-black">
                    {d.label}
                  </div>
                  <span className="text-sm text-gray-300">{d.label}</span>
                </label>
              ))}
            </div>
          </div>
          <input
            id="tos"
            name="agreeTos"
            type="checkbox"
            checked={formData.agreeTos}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-gray-700 text-indigo-600 bg-gray-800"
          />
          <label htmlFor="tos" className="text-sm text-gray-400">
            I agree to the <span className="text-indigo-400 underline">terms and conditions</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md font-semibold disabled:opacity-60"
            >
              {submitting
                ? 'Applying...'
                : `Apply for ${cardType === 'virtual' ? 'Virtual' : 'Physical'} Card`}
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  limit: 50000,
                  address: '',
                  design: 'midnight',
                  agreeTos: false,
                })
                setSuccess(null)
              }}
              className="px-4 py-2 bg-gray-800 rounded-md text-sm"
            >
              Reset
            </button>
          </div>
          {success && (
            <div
              className={`mt-4 p-3 rounded-md ${success.ok ? 'bg-green-900/60 border border-green-700' : 'bg-red-900/60 border border-red-700'}`}
            >
              <p className="text-sm">{success.message}</p>
            </div>
          )}{' '}
        </form>
      </div>

      {/* Right - Live preview */}
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-gray-900/40 to-black/40 border border-gray-800 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Card Preview</h3>
            <span className="text-xs text-gray-500">
              {cardType === 'virtual' ? 'Virtual' : 'Physical'}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto"
          >
            <div
              className={`relative rounded-xl p-6 min-h-[160px] ${formData.design === 'midnight' ? 'bg-gradient-to-br from-indigo-900 to-gray-900' : formData.design === 'aurora' ? 'bg-gradient-to-br from-emerald-700 to-indigo-900' : 'bg-gradient-to-br from-gray-800 to-black'} text-white`}
            >
              <div className="flex justify-between items-start">
                <div className="text-sm font-semibold opacity-90">BitBridge Global</div>
                <div className="text-xs opacity-80">USD</div>
              </div>

              <div className="mt-6 text-2xl tracking-wide font-mono">
                **** **** **** {String(formData.limit).slice(-4)}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-200">Cardholder</div>
                  <div className="font-medium">
                    {`${formData?.first_name}  ${formData?.last_name}` || 'Full Name'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-200">Type</div>
                  <div className="font-medium">
                    {cardType === 'virtual' ? 'Virtual' : 'Physical'}
                  </div>
                </div>
              </div>

              <div className="absolute right-4 bottom-4 text-xs opacity-80">
                {formData?.design?.toUpperCase()}
              </div>
            </div>
          </motion.div>

          <div className="mt-4 text-sm text-gray-400">Preview updates live as you type.</div>
        </div>

        <div className="rounded-2xl p-4 bg-gray-850/30 border border-gray-800">
          <h4 className="text-sm font-medium mb-2">Quick summary</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>
              <strong>Type:</strong> {cardType === 'virtual' ? 'Virtual' : 'Physical'}
            </li>
            <li>
              <strong>Holder:</strong> {`${formData?.first_name}  ${formData?.last_name}` || '—'}
            </li>
            <li>
              <strong>Email:</strong> {formData.email_address || '—'}
            </li>
            <li>
              <strong>Limit:</strong> USD {formData?.limit?.toLocaleString()}
            </li>
            {cardType === 'physical' && (
              <li>
                <strong>Delivery:</strong> {formData.deliveryAddress || '—'}
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl p-4 bg-gray-850/30 border border-gray-800 text-sm">
          <h4 className="font-medium mb-2">Notes</h4>
          <p className="text-gray-400">
            Virtual cards are instant and usable online. Physical cards take 5–10 business days to
            deliver.
          </p>
        </div>
      </div>
    </div>
  )

  const createCardContent = (
    <div>
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="bg-gray-850/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-800">
          <h2 className="text-2xl font-semibold mb-2">CREATE CARD</h2>
          <p className="text-sm text-gray-400 mb-6">
            Fill the form to create a virtual or physical card.
          </p>

          <form onSubmit={handleSubmitCard} className="space-y-4">
            {/* Card Type */}
            <div>
              <label className="block text-sm mb-1">Card Type</label>
              <select
                disabled
                name="card_type"
                value={formData.card_type}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
              >
                <option value="virtual" selected>
                  Virtual
                </option>
                <option value="physical">Physical</option>
              </select>
            </div>

            {/* Brand + Currency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Brand</label>
                <input
                  disabled
                  type="text"
                  name="card_brand"
                  value={formData.card_brand}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Currency</label>
                <input
                  disabled
                  type="text"
                  name="card_currency"
                  value={formData.card_currency}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                />
              </div>
            </div>

            {/* Limit & Funding */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Card Limit</label>
                <input
                  disabled
                  type="number"
                  required
                  name="card_limit"
                  value={formData.card_limit}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Funding Amount</label>
                <input
                  type="number"
                  name="amount"
                  min={4}
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                />
              </div>
            </div>

            {/* Pin */}
            <div>
              <label className="block text-sm mb-1">PIN (Enter PIN)</label>
              <input
                type="password"
                name="pin"
                value={formData.pin}
                maxLength="4"
                onChange={handleChange}
                placeholder="Enter PIN (encrypted in backend)"
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                // onClick={handleSubmitCard}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md font-semibold disabled:opacity-60"
              >
                {submitting ? 'Creating...' : 'Create Card'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    amount: '',
                    pin: '',
                  })
                }
                className="px-4 py-2 bg-gray-800 rounded-md text-sm"
              >
                Reset
              </button>
            </div>

            {successCreate && (
              <div
                className={`mt-4 p-3 rounded-md ${
                  successCreate.ok
                    ? 'bg-green-900/60 border border-green-700'
                    : 'bg-red-900/60 border border-red-700'
                }`}
              >
                <p className="text-sm">{successCreate.message}</p>
              </div>
            )}
          </form>
        </div>

        {/* Right: Preview */}
        <div className="bg-gray-900/40 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-lg font-medium mb-4">Card Preview</h3>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-gradient-to-br from-indigo-900 to-gray-900 text-white p-6 min-h-[160px]"
          >
            <div className="flex justify-between items-start">
              <div className="text-sm font-semibold opacity-90">BitBridge Global</div>
              <div className="text-xs opacity-80">{formData?.card_currency}</div>
            </div>

            <div className="mt-6 text-2xl tracking-wide font-mono">
              {/* **** **** **** {String(formData.card_limit).slice(-4)} */}
              **** **** **** 5000
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-200">Cardholder ID</div>
                {/* <div className="font-medium">{card_holder || '—'}</div> */}
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-200">Type</div>
                <div className="font-medium">{formData.card_type}</div>
              </div>
            </div>
          </motion.div>

          <div className="mt-4 text-sm text-gray-400">The preview updates as you type.</div>
        </div>
      </div>

      {card_holder &&
        cards.map((card) => {
          if (card.card_id) {
            return <CardDetailsUI key={card.card_id} card={card} walletBalance={balance} />
          }
        })}
    </div>
  )

  const { content } =
    step === 'apply'
      ? { title: 'Apply for a Card', content: applyForcardcontent }
      : { title: '', content: createCardContent }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-gray-100 p-6  items-center justify-center">
      <div className="mt-0 text-gray-100 flex items-center justify-center">{content}</div>
    </div>
  )
}

export function CardDetailsUI({ card, walletBalance = 0 }) {
  const { balanceData, rates } = useSelector((state) => state.account)

  const [amount, setAmount] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const dispatch = useDispatch()

  console.log(rates?.['NGN-USD'], 'color')

  const USDBalance =
    walletBalance && rates ? ((walletBalance * 100) / rates['NGN-USD']).toFixed(2) : 0

  useEffect(() => {
    dispatch(getRates())
    dispatch(get_card_balance(card.card_id))
  }, [walletBalance])

  const handleCredit = async (e) => {
    e.preventDefault()
    setStatus(null)

    const numAmount = Number(amount)

    if (numAmount <= 0) {
      setStatus({ ok: false, message: 'Enter a valid amount' })
      return
    }

    if (numAmount > walletBalance) {
      setStatus({ ok: false, message: 'Amount exceeds wallet balance' })
      return
    }

    setLoading(true)

    dispatch(SET_LOADING(true))

    dispatch(fundcard({ card: { card_id: card.card_id, amount: amount, pin: pin } }))
      .unwrap()
      .then((response) => {
        toast('successfully credited card', { type: 'success' })
        setStatus({ ok: true, message: response?.message || 'Card credited successfully' })
        setAmount('')
        setPin('')
      })
      .catch((err) => {
        toast(err?.message || 'Failed to credit card', { type: 'error' })
        setStatus({
          ok: false,
          message: err?.response?.data?.message || 'Failed to credit card',
        })
      })
      .finally(() => {
        setLoading(false)
        dispatch(SET_LOADING(false))
      })
  }
  return (
    <>
      <div className="w-full mt-4 mx-auto grid gap-6">
        {/* CARD PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-br from-indigo-900 to-gray-900 p-6 shadow-xl border border-gray-800 text-white"
        >
          <div className="flex justify-between items-start">
            <div className="text-sm font-semibold opacity-90">BitBridge Global</div>
            <div className="text-xs opacity-80">{card?.currency ?? 'USD'}</div>
          </div>
          <div>
            <div className="text-sm mt-2">Available Balance</div>
            <div className="text-2xl font-mono mt-1">
              {/* {balanceData?.available_balance
                ? `$${(balanceData.available_balance / 100).toFixed(2)}`
                : '$0.00'} */}

              {nairaFormat(
                balanceData?.available_balance ? balanceData?.available_balance / 100 : 0,
                card?.card_currency
              )}
            </div>
          </div>

          <div className="mt-8 text-3xl tracking-widest font-mono">
            **** **** **** {String(card?.last_4) ?? card?.card_number}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <div className="text-xs text-gray-300">Cardholder</div>
              <div className="font-medium">{card?.card_name}</div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-300">Type</div>
              <div className="font-medium">{card?.card_type}</div>
            </div>
          </div>
        </motion.div>

        {/* INFORMATION SECTION */}
        <div className="bg-gray-850/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 shadow-lg space-y-6">
          <h2 className="text-xl font-semibold">Card Information</h2>

          {/* BVN & SECURITY */}

          <div className="pt-6 border-t border-gray-800 space-y-3">
            <h3 className="text-lg font-medium">Security Information</h3>

            <Info
              label="EXPIRY DATE"
              value={`${card?.expiry_month.substring(0, 2)}/${card?.expiry_month.substring(2, 4)}`}
            />
            <Info label="CVV" value={card?.cvv} />
          </div>

          <div className="grid grid-cols-1 border-t border-gray-800 pt-4 md:grid-cols-2 gap-6">
            {/* LEFT SECTION */}
            <div className="space-y-4">
              <Info label="Card ID" value={card?.card_id} />
              <Info label="Cardholder ID" value={card.cardholder_id} />
              <Info label="Brand" value={card.brand} />
              <Info label="Currency" value={card?.card_currency} />
            </div>

            {/* RIGHT SECTION */}
            <div className="space-y-4">
              <Info label="Card Limit" value={`USD ${card.limit ?? ' 5,000'}`} />
              <Info label="Status" value={card?.is_active ? 'Active' : 'Disabled'} />
              <Info label="Created At" value={dateFormater(card.created_at)} />
              <Info label="Funding Source" value={card.funding_source} />
            </div>
          </div>

          {/* ADDRESS INFO */}

          <div className=" border-t border-gray-800 pt-4 ">
            <h3 className="text-lg font-medium">Cardholder Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="pt-6  space-y-3">
                <Info label="Address" value={card?.billing_address?.billing_address1} />
                <Info label="City" value={card?.billing_address?.billing_city} />
                <Info label="State" value={card?.billing_address?.state} />
              </div>{' '}
              <div className="pt-6 space-y-3">
                <Info label="Postal Code" value={card?.billing_address?.billing_zip_code} />
                <Info label="Postal Code" value={card.billing_address?.billing_country} />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="pt-6 border-t border-gray-800 space-y-3">
          <h3 className="text-lg font-medium">Security Information</h3>

          <Info label="BVN" value={card.bvn} />
          <Info label="Linked Wallet" value={card.wallet_id} />
        </div> */}
      </div>

      <div className="bg-gray-850/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 shadow-lg space-y-6">
        <h2 className="text-xl font-semibold">Credit Card</h2>
        <p className="text-gray-400 text-sm">
          Add money from your wallet to this card.
          <br />
          <span className="text-white font-bold">Wallet Balance: ${USDBalance}</span>
        </p>

        <form onSubmit={handleCredit} className="space-y-5">
          {/* Amount Input */}
          <div>
            <label className="block text-sm mb-1">Amount to Credit</label>
            <input
              type="number"
              min={1}
              max={USDBalance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
              placeholder="Enter amount"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max allowed: <span className="text-gray-300">${USDBalance}</span>
            </p>
          </div>

          {/* PIN Input */}
          <div>
            <label className="block text-sm mb-1">PIN</label>
            <input
              onChange={(e) => setPin(e.target.value)}
              type="password"
              maxLength={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
              placeholder="Enter your card PIN"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md font-semibold text-white disabled:opacity-50"
          >
            {loading ? 'Crediting...' : 'Credit Card'}
          </button>

          {status && (
            <div
              className={`mt-4 p-3 rounded-md ${
                status.ok
                  ? 'bg-green-900/60 border border-green-700'
                  : 'bg-red-900/60 border border-red-700'
              }`}
            >
              <p className="text-sm">{status.message}</p>
            </div>
          )}
        </form>
      </div>
    </>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-200 break-all">{value || '—'}</p>
    </div>
  )
}

CardDetailsUI.propTypes = {
  card: PropTypes.object.isRequired,
  walletBalance: PropTypes.number,
  onSubmit: PropTypes.func,
}

Info.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
}
