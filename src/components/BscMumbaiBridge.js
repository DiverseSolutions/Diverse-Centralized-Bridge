import {} from 'react'

export default function BscMumbaiBridge(){
  return (
    <div className="mockup-code">
      <div className="w-full flex flex-col items-center">
        <code className="text-2xl">Bridge Token</code>
        <code className="mt-1 text-sm">BSC -> Mumbai Flow Test</code>

        <div className="w-10/12 my-3">
          <div className="form-control">
            <input type="text" placeholder="Contract Address" className="input input-bordered w-full"/>
            <label className="label">
              <span className="label-text"></span>
              <span className="label-text-alt text-white"></span>
            </label>
          </div>

          <div className="my-2"></div>

          <div className="form-control">
            <input type="text" placeholder="Token Amount" className="input input-bordered w-full"/>
            <label className="label">
              <span className="label-text"></span>
              <span className="label-text-alt text-white"></span>
            </label>
          </div>
        </div>

        <div class="btn-group w-10/12 item-center mb-2">
          <button className="btn w-4/12 btn-info">Approve</button>
          <button className="btn w-8/12 btn-primary">Bridge</button>
        </div>
        <button className="btn w-10/12 btn-warning mb-2">Create Wrapped</button>
      </div>
    </div>
  )
}
