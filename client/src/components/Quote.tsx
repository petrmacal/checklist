import React, { useEffect, useState } from 'react'

export default function Quote() {
  const [quote, setQuote] = useState('')
  useEffect(() => {
    fetch('https://uselessfacts.jsph.pl/random.json')
      .then(res => res.json())
      .then((res) => setQuote(res.text))
      .catch(() => setQuote('I would really like to show some cool quote here, but I have probably reached the limit of this API :('))
  }, [])

  return (
    <div>{quote}</div>
  )
}