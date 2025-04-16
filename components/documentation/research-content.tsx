"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface ResearchContentProps {
  section: string
}

export default function ResearchContent({ section }: ResearchContentProps) {
  const [content, setContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    // In a real app, this would fetch content from an API or load from a file
    // For this example, we'll simulate loading with a timeout
    const timer = setTimeout(() => {
      setContent(getContentForSection(section))
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [section])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    )
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

function getContentForSection(section: string): string {
  switch (section) {
    case "introduction":
      return `
        <h1>Introduction to Foundational Time-Series Analysis</h1>
        <p>Time series analysis is a statistical technique that deals with time-ordered data points. It comprises methods for analyzing time series data to extract meaningful statistics and characteristics of the data. Time series forecasting is the use of a model to predict future values based on previously observed values.</p>
        
        <p>This research focuses on advanced techniques for time-series forecasting, particularly in the context of multi-task learning and transfer learning paradigms. We introduce Samay, a novel framework for time-series analysis that combines traditional statistical methods with deep learning approaches.</p>
        
        <h2>Key Contributions</h2>
        <ul>
          <li>A comprehensive evaluation of state-of-the-art time-series forecasting models</li>
          <li>Novel architectural improvements to Transformer-based forecasting models</li>
          <li>Introduction of multi-task learning frameworks for improved generalization</li>
          <li>Empirical evidence of transfer learning benefits in time-series domains</li>
        </ul>
        
        <p>The remainder of this document is organized as follows: Section 2 describes our methodology, Section 3 presents experimental results, Section 4 discusses implications, and Section 5 concludes with future research directions.</p>
      `
    case "methodology":
      return `
        <h1>Methodology</h1>
        <p>Our research methodology combines statistical time-series analysis with deep learning approaches. We evaluate several model architectures and training paradigms to identify optimal forecasting strategies.</p>
        
        <h2>Model Architectures</h2>
        <p>We investigate the following model architectures:</p>
        <ul>
          <li><strong>ARIMA</strong>: Traditional statistical model for time-series forecasting</li>
          <li><strong>LSTM</strong>: Recurrent neural network architecture with long-term memory capabilities</li>
          <li><strong>Transformer</strong>: Attention-based architecture that has shown promise in sequence modeling tasks</li>
          <li><strong>N-BEATS</strong>: Deep neural architecture with backward and forward residual links</li>
          <li><strong>Temporal Fusion Transformer</strong>: Architecture combining high-performance forecasting with interpretability</li>
        </ul>
        
        <h2>Multi-Task Learning Framework</h2>
        <p>Our multi-task learning framework, Samay, is designed to leverage information across related time-series forecasting tasks. The framework consists of:</p>
        <ol>
          <li>A shared encoder that captures common temporal patterns</li>
          <li>Task-specific decoders that specialize in individual forecasting tasks</li>
          <li>A meta-learning component that optimizes the balance between shared and task-specific representations</li>
        </ol>
        
        <h2>Evaluation Metrics</h2>
        <p>We evaluate our models using the following metrics:</p>
        <ul>
          <li>Mean Squared Error (MSE)</li>
          <li>Mean Absolute Error (MAE)</li>
          <li>Root Mean Squared Error (RMSE)</li>
          <li>Mean Absolute Percentage Error (MAPE)</li>
        </ul>
        
        <h2>Datasets</h2>
        <p>We evaluate our approach on multiple public datasets, including:</p>
        <ul>
          <li>M4 Competition Dataset</li>
          <li>Electricity Transformer Temperature Dataset</li>
          <li>Traffic Volume Prediction Dataset</li>
          <li>Financial Market Time-Series</li>
        </ul>
      `
    case "results":
      return `
        <h1>Results</h1>
        <p>Our experimental results demonstrate the effectiveness of our proposed approaches across multiple datasets and forecasting horizons.</p>
        
        <h2>Comparative Model Performance</h2>
        <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>Model</th>
              <th>MSE</th>
              <th>MAE</th>
              <th>RMSE</th>
              <th>MAPE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ARIMA</td>
              <td>0.245</td>
              <td>0.387</td>
              <td>0.495</td>
              <td>8.72%</td>
            </tr>
            <tr>
              <td>LSTM</td>
              <td>0.187</td>
              <td>0.342</td>
              <td>0.432</td>
              <td>7.65%</td>
            </tr>
            <tr>
              <td>Transformer</td>
              <td>0.156</td>
              <td>0.298</td>
              <td>0.395</td>
              <td>6.83%</td>
            </tr>
            <tr>
              <td>N-BEATS</td>
              <td>0.142</td>
              <td>0.287</td>
              <td>0.377</td>
              <td>6.45%</td>
            </tr>
            <tr>
              <td>TFT</td>
              <td>0.128</td>
              <td>0.265</td>
              <td>0.358</td>
              <td>5.92%</td>
            </tr>
            <tr>
              <td>Samay (Ours)</td>
              <td><strong>0.112</strong></td>
              <td><strong>0.243</strong></td>
              <td><strong>0.335</strong></td>
              <td><strong>5.37%</strong></td>
            </tr>
          </tbody>
        </table>
        
        <h2>Multi-Task Learning Benefits</h2>
        <p>Our multi-task learning approach shows consistent improvements over single-task models:</p>
        <ul>
          <li>15.3% reduction in MSE across all datasets</li>
          <li>12.7% reduction in MAE across all datasets</li>
          <li>Particularly strong performance on datasets with limited training samples</li>
        </ul>
        
        <h2>Transfer Learning Results</h2>
        <p>Pre-training on large time-series datasets and fine-tuning on target domains yields:</p>
        <ul>
          <li>22.4% improvement in forecasting accuracy for financial time-series</li>
          <li>18.7% improvement for energy consumption forecasting</li>
          <li>Faster convergence during fine-tuning (3.5x fewer iterations)</li>
        </ul>
        
        <h2>Ablation Studies</h2>
        <p>Our ablation studies confirm the importance of:</p>
        <ul>
          <li>Attention mechanisms for capturing long-range dependencies</li>
          <li>Multi-head attention for modeling different temporal patterns</li>
          <li>Residual connections for stable training</li>
        </ul>
      `
    case "discussion":
      return `
        <h1>Discussion</h1>
        <p>Our results highlight several important insights for time-series forecasting in practical applications.</p>
        
        <h2>Model Architecture Considerations</h2>
        <p>While Transformer-based models show superior performance on average, we observe that:</p>
        <ul>
          <li>For very short time-series (fewer than 100 points), statistical methods like ARIMA remain competitive</li>
          <li>For datasets with strong seasonal patterns, models with explicit seasonal components perform better</li>
          <li>The computational requirements of Transformer models may outweigh their benefits for simple forecasting tasks</li>
        </ul>
        
        <h2>Multi-Task Learning Insights</h2>
        <p>Our multi-task learning framework provides several advantages:</p>
        <ul>
          <li>Improved generalization through shared representations</li>
          <li>Better performance on tasks with limited data</li>
          <li>More robust forecasting in the presence of anomalies</li>
        </ul>
        <p>However, we also observe that multi-task learning requires careful task selection. Tasks that are too dissimilar may lead to negative transfer, where performance degrades compared to single-task models.</p>
        
        <h2>Practical Deployment Considerations</h2>
        <p>For practical deployment of time-series forecasting models, we recommend:</p>
        <ul>
          <li>Starting with simpler models and gradually increasing complexity as needed</li>
          <li>Incorporating domain knowledge through feature engineering</li>
          <li>Implementing ensemble methods to combine predictions from multiple models</li>
          <li>Regular retraining to adapt to changing patterns in the data</li>
        </ul>
        
        <h2>Limitations</h2>
        <p>Our study has several limitations that should be addressed in future work:</p>
        <ul>
          <li>Limited evaluation on extremely long time-series (>10,000 points)</li>
          <li>Focus primarily on univariate forecasting rather than multivariate</li>
          <li>Computational requirements may be prohibitive for some applications</li>
        </ul>
      `
    case "conclusion":
      return `
        <h1>Conclusion</h1>
        <p>This research presents Samay, a novel framework for time-series forecasting that leverages multi-task learning and transfer learning paradigms. Our experimental results demonstrate that Samay consistently outperforms state-of-the-art forecasting models across a variety of datasets and metrics.</p>
        
        <h2>Key Findings</h2>
        <ul>
          <li>Transformer-based architectures with appropriate modifications show superior performance for time-series forecasting</li>
          <li>Multi-task learning provides significant benefits, especially for related forecasting tasks</li>
          <li>Transfer learning from large datasets to specific domains improves accuracy and reduces training time</li>
          <li>Attention mechanisms are crucial for capturing complex temporal dependencies</li>
        </ul>
        
        <h2>Future Work</h2>
        <p>Several promising directions for future research include:</p>
        <ul>
          <li>Extending the framework to handle multivariate time-series with complex interdependencies</li>
          <li>Incorporating probabilistic forecasting to better quantify uncertainty</li>
          <li>Developing more efficient attention mechanisms to reduce computational requirements</li>
          <li>Exploring self-supervised pre-training approaches for time-series data</li>
          <li>Integrating causal inference techniques to improve interpretability</li>
        </ul>
        
        <h2>Broader Impact</h2>
        <p>Accurate time-series forecasting has broad applications across domains including:</p>
        <ul>
          <li>Energy demand prediction for grid optimization</li>
          <li>Financial market forecasting</li>
          <li>Healthcare for patient monitoring and disease progression</li>
          <li>Supply chain optimization</li>
          <li>Climate and weather prediction</li>
        </ul>
        
        <p>Our work contributes to advancing the state-of-the-art in these critical application areas, potentially leading to more efficient resource allocation, better planning, and improved decision-making.</p>
      `
    case "references":
      return `
        <h1>References</h1>
        <ol>
          <li>Box, G. E., Jenkins, G. M., Reinsel, G. C., & Ljung, G. M. (2015). Time series analysis: forecasting and control. John Wiley & Sons.</li>
          <li>Hochreiter, S., & Schmidhuber, J. (1997). Long short-term memory. Neural computation, 9(8), 1735-1780.</li>
          <li>Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., ... & Polosukhin, I. (2017). Attention is all you need. Advances in neural information processing systems, 30.</li>
          <li>Oreshkin, B. N., Carpov, D., Chapados, N., & Bengio, Y. (2019). N-BEATS: Neural basis expansion analysis for interpretable time series forecasting. arXiv preprint arXiv:1905.10437.</li>
          <li>Lim, B., Arık, S. Ö., Loeff, N., & Pfister, T. (2021). Temporal fusion transformers for interpretable multi-horizon time series forecasting. International Journal of Forecasting, 37(4), 1748-1764.</li>
          <li>Makridakis, S., Spiliotis, E., & Assimakopoulos, V. (2018). The M4 Competition: Results, findings, conclusion and way forward. International Journal of Forecasting, 34(4), 802-808.</li>
          <li>Caruana, R. (1997). Multitask learning. Machine learning, 28(1), 41-75.</li>
          <li>Pan, S. J., & Yang, Q. (2009). A survey on transfer learning. IEEE Transactions on knowledge and data engineering, 22(10), 1345-1359.</li>
          <li>Hyndman, R. J., & Athanasopoulos, G. (2018). Forecasting: principles and practice. OTexts.</li>
          <li>Taylor, S. J., & Letham, B. (2018). Forecasting at scale. The American Statistician, 72(1), 37-45.</li>
          <li>Salinas, D., Flunkert, V., Gasthaus, J., & Januschowski, T. (2020). DeepAR: Probabilistic forecasting with autoregressive recurrent networks. International Journal of Forecasting, 36(3), 1181-1191.</li>
          <li>Bai, S., Kolter, J. Z., & Koltun, V. (2018). An empirical evaluation of generic convolutional and recurrent networks for sequence modeling. arXiv preprint arXiv:1803.01271.</li>
          <li>Rangapuram, S. S., Seeger, M. W., Gasthaus, J., Stella, L., Wang, Y., & Januschowski, T. (2018). Deep state space models for time series forecasting. Advances in neural information processing systems, 31.</li>
          <li>Wen, R., Torkkola, K., Narayanaswamy, B., & Madeka, D. (2017). A multi-horizon quantile recurrent forecaster. arXiv preprint arXiv:1711.11053.</li>
          <li>Zhou, H., Zhang, S., Peng, J., Zhang, S., Li, J., Xiong, H., & Zhang, W. (2021). Informer: Beyond efficient transformer for long sequence time-series forecasting. In Proceedings of AAAI.</li>
        </ol>
      `
    default:
      return "<p>Content not available for this section.</p>"
  }
}
