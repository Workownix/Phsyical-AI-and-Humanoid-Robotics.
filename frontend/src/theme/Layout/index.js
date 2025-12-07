import React from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { PageMetadata } from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import Navbar from '@theme/Navbar';
import LayoutHead from './Head';
import LayoutBg from './Bg';
import LayoutProvider from '@theme/Layout/Provider';
import AnnouncementBar from '@theme/AnnouncementBar';
import Footer from '@theme/Footer';
import styles from './styles.module.css';
export default function Layout(props) {
  const { children, noFooter, wrapperClassName, // Not used, for now
  pageClassName, title, description } = props;
  useKeyboardNavigation();
  return (
    <LayoutProvider>
      <LayoutHead />
      <LayoutBg />

      <PageMetadata title={title} description={description} />

      <AnnouncementBar />

      <Navbar />

      <div
        id="docusaurus-skip-to-content"
        className={clsx(
          styles.wrapper,
          wrapperClassName,
          pageClassName
        )}>
        <ErrorBoundary fallback={(error, resetErrorBoundary) => (
          <LayoutProvider>
            <PageMetadata title={'Error'} />
            <div className={clsx(styles.wrapper, wrapperClassName, pageClassName)}>
              <h1>{error.message}</h1>
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          </LayoutProvider>
        )}>
          {children}
        </ErrorBoundary>
      </div>

      {!noFooter && <Footer />}

      {/* RAG Chatbot Placeholder: Embed your chatbot component here */}
      {/* <RAGChatbot /> */}
    </LayoutProvider>
  );
}
