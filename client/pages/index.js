import Head from 'next/head';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import useSWR from 'swr';
import Searchbox from '../components/common/Searchbox';

import styles from '../styles/Home.module.css';

const { GOOGLE_API_KEY } = process.env;

export default function Home() {
  const [value, setValue] = useState('');
  const [paramEndpoint, setParamEndpoint] = useState('');

  const debouncedSave = useRef(
    debounce(nextValue => setParamEndpoint(nextValue), 1000)
  ).current;

  const endpoint = paramEndpoint
    ? `/api/places/autocomplete/${paramEndpoint}`
    : null;
  const { data } = useSWR(endpoint);

  const handleOnChange = event => {
    const { value: nextValue } = event.target;
    setValue(nextValue);
    debouncedSave(nextValue);
  };

  console.log({ paramEndpoint });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form>
          <Searchbox
            data={data?.predictions}
            value={value}
            onChange={handleOnChange}
          />
          <h1>HELLO :DDDDDDDDDDD this is main page</h1>
        </form>
      </main>
    </div>
  );
}
