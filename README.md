# Samay Dashboard

An interactive dashboard for time-series forecasting using state-of-the-art foundational models.

## Overview

Samay Dashboard is a web-based tool that enables users to interact with and evaluate several foundational time-series forecasting models, including:

- **Large Pre-trained Time-Series Model (LPTM)** - Our primary model, as described in [this research paper](https://arxiv.org/abs/2311.11413)
- **TimesFM** - For benchmarking and comparison
- **Chronos** - For benchmarking and comparison
- **TimeMOE** - For benchmarking and comparison

The dashboard provides a comprehensive interface to:
- Upload custom datasets
- Load pre-trained forecasting models
- Fine-tune models on user data
- Generate forecasts and visualize results
- Explore summarized research findings and methodologies

## Architecture

The system consists of two main components:

1. **Frontend Dashboard**: A user-friendly interface for interacting with the models
2. **Backend API**: A Flask-based RESTful API that handles model operations on an NVIDIA DGX server

### Backend API

The Flask API provides four main endpoints:

#### 1. `/load_model`
Loads a specified forecasting model into memory.

```python
# Example usage
POST /load_model
{
  "model_name": "LPTM"  # or "TimesFM"
}
```

#### 2. `/upload_dataset`
Allows users to upload custom time-series datasets.

```python
# Example usage
POST /upload_dataset
Form data:
- dataset: [CSV file]
- model_name: "LPTM"  # or "TimesFM"
```

#### 3. `/finetune`
Fine-tunes a loaded model on the uploaded dataset.

```python
# Example usage
POST /finetune
{
  "model_name": "LPTM"  # or "TimesFM"
}
```

#### 4. `/run_inference`
Runs inference on the loaded model and returns forecast visualizations.

```python
# Example usage
POST /run_inference
{
  "model_name": "LPTM"  # or "TimesFM"
}
```

## Features

- **Model Selection**: Choose from several state-of-the-art time-series forecasting models
- **Dataset Management**: Upload and manage custom time-series datasets
- **Fine-tuning Capabilities**: Adapt pre-trained models to specific domains
- **Visualization**: Interactive plots of historical data and forecasts
- **Research Integration**: Access to research methodologies and comparative performance metrics
- **Benchmarking**: Compare LPTM performance against other foundational models

## Implementation Details

The backend is implemented as a Flask API with CORS support, specifically configured to work with the frontend hosted at `https://showmick119.github.io`. The API communicates with the models and datasets stored on an NVIDIA DGX server.

### Model Support

Currently, the system supports:

- **LPTM**: Large Pre-trained Time-Series Model with configurable forecasting horizons
- **TimesFM**: Google's TimesFM model (1.0-200m-pytorch) for comparative analysis

### Forecasting Visualization

The system generates visualizations that show:
- 512 timesteps of historical data
- 192 timesteps of ground truth
- 192 timesteps of model forecast

## Research Background

This project implements and uses the models and methods described in [Large Pre-trained Time-Series Models](https://arxiv.org/abs/2311.11413). The LPTM model forms the core of our forecasting capabilities, with other models included primarily for benchmarking and performance comparison.
