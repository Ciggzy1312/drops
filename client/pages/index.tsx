import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className=" py-8 px-10">
      
      <div className="flex justify-between">
        <div className="text-2xl text-indigo-400 font-semibold">Drops</div>

        <div className="text-white font-semibold text-xs self-center">
          <Link href="https://github.com/Ciggzy1312/moodventure" target='_blank' rel="noreferrer"><button className="bg-slate-800 px-2 py-1 rounded text-white">Star us on Github</button></Link>
        </div>
      </div>

      <div className="py-10 mt-16">
        <div className=" py-4">
          <div className="text-6xl font-medium">
            <h1 className="font-bold">Increase your productivity by <span className="text-indigo-400 text-7xl">100x</span> by <br></br> finding and sharing best <span className="text-indigo-400">resources</span> to learn</h1>
          </div>
          <div className="my-4 w-1/2 ">
            <p className="text-gray-600">Drops lets you create or find the collection of best resources be it YouTube videos, blogs or online articles in a curated manner so that you can accelerate your learnings and increase your productivity. So instead of scraping the internet for something, find a drop of your choice and start learning now </p>
          </div>
        </div>

        <div className="my-4">
          <Link href="/dashboard"><button className="text-white bg-indigo-400 border-indigo-400 border-2 rounded font-semibold px-4 py-1.5 mr-6">Get Started</button></Link>
          <button className="bg-white text-indigo-400 border-indigo-400 border-2 rounded font-semibold px-4 py-1.5">Watch Demo</button>
        </div>
      </div>
    </div>
  )
}

export default Home
